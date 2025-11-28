import axios from 'axios';

// Mock API client
const mockClient = {
    post: async (url, data) => {
        console.log(`POST ${url}`, data);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (url === '/api/agent/message') {
            const userText = data.text.toLowerCase();

            // Grounding Techniques Library
            const groundingTechniques = [
                "Box breathing (Inhale 4s, Hold 4s, Exhale 4s, Hold 4s)",
                "4-7-8 breath (Inhale 4s, Hold 7s, Exhale 8s)",
                "Slow 5-second inhale / 6-second exhale",
                "5–4–3–2–1 grounding (5 things you see, 4 feel, 3 hear...)",
                "Name-and-validate method ('I am feeling anxious and that is okay')",
                "Mini neck and shoulder release (Gentle stretches)",
                "Slow body scan (Notice tension from head to toe)",
                "Tactile grounding (Rubbing palms together, noticing texture)",
                "Cognitive reframing (Finding a different perspective)",
                "“I notice…” technique (Observing surroundings without judgment)",
                "Quick gratitude prompt (Name one small good thing today)",
                "Micro-journaling (Write for just 30 seconds)"
            ];

            const getRandomGrounding = () => groundingTechniques[Math.floor(Math.random() * groundingTechniques.length)];

            let response = {
                text: "I'm here to listen. Could you tell me a bit more about what's on your mind?",
                escalation: false,
                recommended_feature: null
            };

            // 1. Crisis / Severe Issue (Alert Counsellor)
            if (userText.match(/(kill|suicide|hurt myself|die|end it all|abuse|danger|severe|poison|hang myself|overdose|no way out)/i)) {
                response.text = "I hear how much pain you're in, and I want you to know that your safety matters deeply. I am alerting a counsellor to support you further. Please consider booking an appointment immediately using the card below, or reach out to a trusted adult right now. You can also call the India Suicide Prevention Helpline: 9152987821.";
                response.escalation = true;
                response.critical = true;
                response.alert_counsellor = true;
                response.alert_authority = true;
                response.helpline = "9152987821";
                response.action = "call_counsellor_now";
                response.recommended_feature = "counsellor";
            }
            // 2. Trauma / Deep Experience (Listen & Solve)
            else if (userText.match(/(trauma|ptsd|flashback|nightmare|past|experience|heavy|painful|memories)/i)) {
                const responses = [
                    "I'm listening. It takes a lot of courage to share that. Please take your time. While I'm an AI, I can suggest some grounding techniques to help you feel safer in this moment, or we can explore the Journal to let these feelings out gently. What feels right for you?",
                    "Thank you for trusting me with this. Trauma can feel incredibly heavy. You don't have to carry it all alone. Would you be open to trying a gentle grounding exercise like " + getRandomGrounding() + "?",
                    "I hear you. That sounds like a really difficult experience to carry. Sometimes writing it down can help release some of that weight. The Journal is here for you if you need a safe space."
                ];
                response.text = responses[Math.floor(Math.random() * responses.length)];
                response.recommended_feature = "journal";
            }
            // 3. Depression / Sadness
            else if (userText.match(/(sad|depressed|lonely|unhappy|cry|down)/i)) {
                const responses = [
                    "I hear you, and it's okay to feel this way. You're not alone in this. Sometimes writing things down can help process these heavy feelings. Would you like to try the Journal?",
                    "I'm sorry you're feeling down. It's okay to not be okay. Have you tried the " + getRandomGrounding() + "? It might help bring a little calm.",
                    "Sending you a virtual hug. Loneliness can be tough. Maybe checking out the Community stories could help you feel a bit more connected? Or we could just breathe together."
                ];
                response.text = responses[Math.floor(Math.random() * responses.length)];
                response.recommended_feature = "journal";
            }
            // 4. Anxiety / Stress / Overwhelm
            else if (userText.match(/(anx|stress|panic|scared|overwhelm|pressure|exams)/i)) {
                const technique = getRandomGrounding();
                const responses = [
                    `It sounds like you're carrying a lot right now. Let's take a moment to pause. Try this grounding exercise: ${technique}. We also have a Mood Tracker if you'd like to log this feeling.`,
                    `I can hear the stress in your words. Let's slow down together. Have you ever tried ${technique}? It can really help reset your nervous system.`,
                    `Exams and pressure can be so overwhelming. You're doing the best you can. Let's try a quick reset: ${technique}. How does that feel?`
                ];
                response.text = responses[Math.floor(Math.random() * responses.length)];
                response.recommended_feature = "mood_tracker";
            }
            // 5. Resources / Help
            else if (userText.match(/(resource|help|guide|tips|advice)/i)) {
                response.text = "We have a library of resources designed to support you. From managing anxiety to student stories, you might find something helpful there.";
                response.recommended_feature = "resources";
            }
            // 6. Off-topic (Irrelevant stuff)
            else if (userText.match(/(code|java|python|math|solve|president|news|weather|sports|movie)/i)) {
                response.text = "I can't answer to that, since it is not related to mental health. I'm here to support your well-being.";
            }
            // 7. Greeting
            else if (userText.match(/(hi|hello|hey|greetings)/i)) {
                const greetings = [
                    "Hello! I'm BuddyBot. I'm here to listen and support you with empathy. How are you feeling today?",
                    "Hi there. I'm here for you. What's on your mind right now?",
                    "Welcome. I'm BuddyBot, your safe space. How can I support you today?"
                ];
                response.text = greetings[Math.floor(Math.random() * greetings.length)];
            }

            return { data: response };
        }

        return { data: {} };
    }
};

// In a real app, you would use axios.create()
// const client = axios.create({ baseURL: '/api' });
const client = mockClient;

export const sendMessage = async (text) => {
    try {
        const response = await client.post('/api/agent/message', { text });
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return {
            text: "Sorry, I'm having trouble connecting right now.",
            escalation: false,
            recommended_feature: null
        };
    }
};

export default client;
