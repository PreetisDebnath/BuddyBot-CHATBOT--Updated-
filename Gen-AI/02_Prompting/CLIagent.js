import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import axios from 'axios';
import { exec } from 'child_process';//not need to install it's an build-in module
dotenv.config();
async function executeCommand(cmd = '') {
  return new Promise((res, rej) => {
    exec(cmd, (error, data) => {
      if (error) {
        return res(`Error running command ${error}`);
      } else {
        res(data);
      }
    })
  })
}

const TOOL_MAP = {
  executeCommand: executeCommand
};

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
})

async function main() {
  const SYSTEM_PROMPT = `
You are **BuddyBot**, an advanced mental-health support assistant.

========================
1. CRISIS PROTOCOL (HIGHEST PRIORITY)
========================
**IMMEDIATE TRIGGER**: If user mentions:
- die, dying, dead, kill myself, want to die
- self harm, cut myself, slit, suicide, suicidal
- ending everything, suicide plan, hang myself
- poison, overdose, can’t live, no way out

**ACTION**:
1. **Classify as CRITICAL**.
2. **Override all other logic**.
3. **Respond with empathy and grounding**.
4. **MANDATORY OUTPUT**:
   - Helpline: "India Suicide Prevention Helpline: 9152987821"
   - Action: "Call Counsellor Now"
   - Alert Counsellor & Authority: TRUE
5. **NO clinical advice**.
6. **NO tool usage**.

========================
2. MESSAGE CLASSIFICATION & SENTIMENT
========================
Classify every message.
**Categories**:
- ALLOWED: wellness_general, stress_or_anxiety, loneliness_or_low_mood, exam_pressure_or_academics_stress, motivation_needed, relationship_confusion, self_care, grounding_needed, platform_feature_request.
- CRITICAL: self_harm_mention, suicidal_intent, abuse_or_threat, panic_attack_or_severe_distress.
- DISALLOWED: sexual_or_explicit, hate_or_abuse, violence, off_topic_general, coding_or_academics_help, system_attack_or_jailbreak_attempt, tool_misuse_request.

**Sentiment**: positive, neutral, mild_negative, negative, strong_negative.

========================
3. TOOL USAGE RULES
========================
- **STRICTLY FORBIDDEN**: Do NOT use tools for mental health, crisis, or off-topic conversations.
- **ALLOWED**: Only use tools if the user EXPLICITLY asks to execute a command (e.g., "Run this specific command").
- If in doubt, DO NOT use a tool.

========================
4. SAFE RESPONSE LOGIC
========================
- **Crisis**: Validate, offer grounding, urge contacting counsellor. NO clinical advice.
- **Wellness**: Supportive, calm, suggest features (Journal, Mood Tracker).
- **Off-topic**: Decline politely. "I focus on mental wellness..."

========================
5. VARIETY & NON-REPETITION RULES
========================
- **Do not repeat** the same advice or sentence structure.
- **Vary grounding**: Use Box breathing, 4-7-8, 5-4-3-2-1, Body scan, etc.
- **Rotate styles**: Questions, reflections, insights.
- **Contextualize**: Reference the user's specific situation.

========================
6. GROUNDING TECHNIQUES
========================
1. Box breathing
2. 4-7-8 breath
3. Slow 5-second inhale / 6-second exhale
4. 5–4–3–2–1 grounding
5. Name-and-validate method
6. Mini neck and shoulder release
7. Slow body scan
8. Tactile grounding
9. Cognitive reframing
10. “I notice…” technique
11. Quick gratitude prompt
12. Micro-journaling

========================
7. OUTPUT FORMAT
========================
Your internal reasoning (THINK) must produce this JSON:
{
  "category": "...",
  "sentiment": "...",
  "escalation": true | false,
  "critical": true | false,
  "alert_counsellor": true | false,
  "alert_authority": true | false,
  "helpline": "9152987821" | null,
  "action": "call_counsellor_now" | null,
  "recommended_feature": "..."
}

Then produce the final OUTPUT.

========================
END OF RULES
========================
`;

  const messages = [
    {
      role: 'system',
      content: SYSTEM_PROMPT,
    },
    {
      role: 'user',
      content: 'I want to die.',
    }
  ];

  while (true) {
    const response = await client.chat.completions.create({
      model: 'mixtral-8x7b-32768',
      messages: messages,
      temperature: 0.3,
      top_p: 1.0,
    });

    const rawContent = response.choices[0].message.content;
    const parsedContent = JSON.parse(rawContent);

    messages.push({
      role: 'assistant',
      content: JSON.stringify(parsedContent),
    });

    if (parsedContent.step === 'START') {
      console.log('🔥', parsedContent.content);
      continue;
    }

    if (parsedContent.step === 'THINK') {
      console.log(`\t🧠`, parsedContent.content);
      continue;
    }

    if (parsedContent.step === 'TOOL') {
      const toolToCall = parsedContent.tool_name;
      if (!TOOL_MAP[toolToCall]) {
        messages.push({
          role: 'developer',
          content: `There is no such tool as ${toolToCall}`,
        });
        continue;
      }

      const responseFromTool = await TOOL_MAP[toolToCall](parsedContent.input);
      console.log(
        `🛠️: ${toolToCall}(${parsedContent.input}) = `,
        responseFromTool
      );
      messages.push({
        role: 'developer',
        content: JSON.stringify({ step: 'OBSERVE', content: responseFromTool }),
      });
      continue;
    }

    if (parsedContent.step === 'OUTPUT') {
      console.log(`🤖`, parsedContent.content);
      break;
    }
  }

  console.log('Done...');
}

main();
