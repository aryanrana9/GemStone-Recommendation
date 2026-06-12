// Astrological calculation engine for gemstone recommendations

const getZodiacSign = (dobString) => {
  if (!dobString) return 'Aries';
  const date = new Date(dobString);
  if (isNaN(date.getTime())) return 'Aries';
  
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  return 'Pisces';
};

const getPlanetaryRule = (zodiac) => {
  const rules = {
    Aries: { planet: 'Mars', luckyMetal: 'Copper or Gold', luckyFinger: 'Ring Finger', luckyDay: 'Tuesday' },
    Taurus: { planet: 'Venus', luckyMetal: 'Silver or Platinum', luckyFinger: 'Middle or Ring Finger', luckyDay: 'Friday' },
    Gemini: { planet: 'Mercury', luckyMetal: 'Gold or Bronze', luckyFinger: 'Little Finger', luckyDay: 'Wednesday' },
    Cancer: { planet: 'Moon', luckyMetal: 'Silver', luckyFinger: 'Little Finger', luckyDay: 'Monday' },
    Leo: { planet: 'Sun', luckyMetal: 'Gold', luckyFinger: 'Ring Finger', luckyDay: 'Sunday' },
    Virgo: { planet: 'Mercury', luckyMetal: 'Gold or Silver', luckyFinger: 'Little Finger', luckyDay: 'Wednesday' },
    Libra: { planet: 'Venus', luckyMetal: 'Silver or Gold', luckyFinger: 'Ring Finger', luckyDay: 'Friday' },
    Scorpio: { planet: 'Mars', luckyMetal: 'Copper or Silver', luckyFinger: 'Ring Finger', luckyDay: 'Tuesday' },
    Sagittarius: { planet: 'Jupiter', luckyMetal: 'Gold', luckyFinger: 'Index Finger', luckyDay: 'Thursday' },
    Capricorn: { planet: 'Saturn', luckyMetal: 'Iron or Silver', luckyFinger: 'Middle Finger', luckyDay: 'Saturday' },
    Aquarius: { planet: 'Saturn', luckyMetal: 'Iron or Silver', luckyFinger: 'Middle Finger', luckyDay: 'Saturday' },
    Pisces: { planet: 'Jupiter', luckyMetal: 'Gold', luckyFinger: 'Index Finger', luckyDay: 'Thursday' }
  };
  return rules[zodiac] || rules['Aries'];
};

const callGeminiAPI = async (inputs, gemstoneNames) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  try {
    const { dob, careerGoals, financialGoals, healthConcerns } = inputs;
    const zodiac = getZodiacSign(dob);
    const planetRule = getPlanetaryRule(zodiac);

    // Build system instructions and prompt matching our available gemstone names exactly
    const systemInstruction = `You are AstroGem, an advanced astrological gemstone expert AI. Your task is to recommend a gemstone and up to 3 alternative gemstones for a user based on their birth parameters and life goals.
You MUST pick the recommended gemstone name and the alternative gemstone names ONLY from this exact list of available stones in our database: ${gemstoneNames.join(', ')}. Do not suggest any stone that is not in this list.

You must return a structured JSON response with the following JSON schema:
{
  "zodiacSign": "string",
  "recommendedGemstoneName": "string",
  "confidenceScore": number, // an integer between 85 and 98
  "explanation": "string", // a detailed explanation of why this gemstone fits their planetary alignments (dob, ruling sign) and career/financial/health intentions. Be premium, celestial and encouraging in your writing.
  "alternatives": ["string", "string", "string"] // an array of up to 3 alternative gemstone names from the list
}`;

    const prompt = `Calculate the best gemstone for:
- Zodiac Sign: ${zodiac} (Planetary Ruler: ${planetRule.planet})
- Birth Details: Date of Birth is ${dob}
- Career Goals: ${careerGoals || 'N/A'}
- Financial Goals: ${financialGoals || 'N/A'}
- Health Concerns: ${healthConcerns || 'N/A'}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemInstruction}\n\nUser Profile:\n${prompt}` }]
            }
          ],
          generationConfig: {
            responseMimeType: 'application/json'
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API call failed with status:', response.status, errorText);
      return null;
    }

    const data = await response.json();
    const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textOutput) {
      console.error('Gemini API returned an empty output structure:', JSON.stringify(data));
      return null;
    }

    const parsed = JSON.parse(textOutput.trim());
    return parsed;
  } catch (error) {
    console.error('Error in callGeminiAPI helper:', error.message);
    return null;
  }
};

const runRecommendation = async (inputs, dbGemstones = []) => {
  const { dob, careerGoals, financialGoals, healthConcerns } = inputs;
  const zodiac = getZodiacSign(dob);
  const planetRule = getPlanetaryRule(zodiac);

  // Default fallback gemstones if database is empty
  const defaultGemstones = [
    {
      name: 'Ruby',
      image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=400',
      description: 'A precious red gemstone representing the Sun, bringing leadership, power, and courage.',
      benefits: ['Enhances leadership qualities', 'Improves vitality and stamina', 'Brings fame and confidence'],
      planetAssociation: 'Sun',
      zodiacCompatibility: ['Leo', 'Aries', 'Sagittarius'],
      wearingMethod: 'Purify with raw milk and Gangajal, chant Surya Mantra, and wear before sunrise.',
      recommendedMetal: 'Gold',
      recommendedFinger: 'Ring Finger',
      recommendedDay: 'Sunday'
    },
    {
      name: 'Emerald',
      image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&q=80&w=400',
      description: 'A vibrant green gemstone connected to Mercury, enhancing wisdom, logic, and communications.',
      benefits: ['Boosts communication skills', 'Improves intelligence and logic', 'Aids in business growth'],
      planetAssociation: 'Mercury',
      zodiacCompatibility: ['Gemini', 'Virgo', 'Taurus', 'Libra'],
      wearingMethod: 'Wash in Gangajal, chant Budh Mantra, and wear after sunrise.',
      recommendedMetal: 'Gold or Silver',
      recommendedFinger: 'Little Finger',
      recommendedDay: 'Wednesday'
    },
    {
      name: 'Yellow Sapphire',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400',
      description: 'A premium yellow gemstone symbolizing Jupiter, bringing wisdom, spiritual growth, and prosperity.',
      benefits: ['Brings massive financial prosperity', 'Enhances wisdom and knowledge', 'Aids in career promotions'],
      planetAssociation: 'Jupiter',
      zodiacCompatibility: ['Sagittarius', 'Pisces', 'Aries', 'Leo'],
      wearingMethod: 'Purify with holy water, chant Guru Mantra, and wear in the morning.',
      recommendedMetal: 'Gold',
      recommendedFinger: 'Index Finger',
      recommendedDay: 'Thursday'
    },
    {
      name: 'Blue Sapphire',
      image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=400',
      description: 'The fastest acting gemstone representing Saturn, offering protection, focus, and rapid success.',
      benefits: ['Offers strong shield of protection', 'Improves concentration and focus', 'Brings sudden prosperity'],
      planetAssociation: 'Saturn',
      zodiacCompatibility: ['Capricorn', 'Aquarius', 'Taurus', 'Libra'],
      wearingMethod: 'Wash in mustard oil and water, chant Shani Mantra, and wear in the evening.',
      recommendedMetal: 'Iron or Silver',
      recommendedFinger: 'Middle Finger',
      recommendedDay: 'Saturday'
    },
    {
      name: 'Pearl',
      image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=400',
      description: 'A soothing gemstone embodying the Moon, bringing mental stability, peace, and emotional balance.',
      benefits: ['Calms anger and mental anxiety', 'Improves relations with mother', 'Provides emotional clarity'],
      planetAssociation: 'Moon',
      zodiacCompatibility: ['Cancer', 'Pisces', 'Scorpio'],
      wearingMethod: 'Purify in milk, chant Chandra Mantra, and wear on a Monday morning.',
      recommendedMetal: 'Silver',
      recommendedFinger: 'Little Finger',
      recommendedDay: 'Monday'
    },
    {
      name: 'Red Coral',
      image: 'https://images.unsplash.com/photo-1535401991746-da3d9055713e?auto=format&fit=crop&q=80&w=400',
      description: 'An organic red gemstone representing Mars, boosting physical energy, courage, and victory.',
      benefits: ['Enhances courage and stamina', 'Overcomes fears and enemies', 'Improves blood circulation'],
      planetAssociation: 'Mars',
      zodiacCompatibility: ['Aries', 'Scorpio', 'Cancer', 'Leo'],
      wearingMethod: 'Purify, chant Mangal Mantra, and wear on a Tuesday morning.',
      recommendedMetal: 'Copper or Gold',
      recommendedFinger: 'Ring Finger',
      recommendedDay: 'Tuesday'
    },
    {
      name: 'Opal',
      image: 'https://images.unsplash.com/photo-1551270276-8098ad80f2d5?auto=format&fit=crop&q=80&w=400',
      description: 'A dazzling white stone with play-of-color representing Venus, boosting luxury, beauty, and creativity.',
      benefits: ['Enhances creative skills', 'Brings luxury and aesthetic pleasure', 'Improves love relationships'],
      planetAssociation: 'Venus',
      zodiacCompatibility: ['Taurus', 'Libra', 'Gemini', 'Aquarius'],
      wearingMethod: 'Wash in rose water, chant Shukra Mantra, and wear on a Friday morning.',
      recommendedMetal: 'Silver or Platinum',
      recommendedFinger: 'Middle or Ring Finger',
      recommendedDay: 'Friday'
    },
    {
      name: 'Amethyst',
      image: 'https://images.unsplash.com/photo-1523450001312-faa4e2e31f07?auto=format&fit=crop&q=80&w=400',
      description: 'A purple quartz representing Saturn, boosting calmness, spiritual growth, and relief from addictions.',
      benefits: ['Calms overactive minds', 'Provides spiritual protection', 'Helps overcome bad habits'],
      planetAssociation: 'Saturn',
      zodiacCompatibility: ['Aquarius', 'Capricorn', 'Aries'],
      wearingMethod: 'Wash, chant Shani Mantra, and wear on a Saturday evening.',
      recommendedMetal: 'Silver',
      recommendedFinger: 'Middle Finger',
      recommendedDay: 'Saturday'
    }
  ];

  // Merge database gemstones if available
  const list = dbGemstones.length > 0 ? dbGemstones : defaultGemstones;
  const gemstoneNames = list.map(g => g.name);

  // Try calling Gemini API first if key exists
  if (process.env.GEMINI_API_KEY) {
    console.log('Gemini API key found, attempting AI recommendation...');
    const geminiOutput = await callGeminiAPI(inputs, gemstoneNames);
    
    if (geminiOutput) {
      console.log('Gemini AI recommendation successful!');
      
      // Find the primary gemstone object from our catalog matching Gemini's choice
      let primaryGem = list.find(g => g.name.toLowerCase() === geminiOutput.recommendedGemstoneName.toLowerCase());
      
      // Fallback in case Gemini chose a name not matching our list, or did not return one
      if (!primaryGem) {
        primaryGem = list.find(g => {
          const zodiacs = Array.isArray(g.zodiacCompatibility) 
            ? g.zodiacCompatibility.map(z => z.toLowerCase()) 
            : [];
          return zodiacs.includes(zodiac.toLowerCase());
        });
      }
      if (!primaryGem) {
        primaryGem = list[2]; // default fallback
      }

      // Map alternatives
      const alternatives = [];
      if (Array.isArray(geminiOutput.alternatives)) {
        geminiOutput.alternatives.forEach(altName => {
          const match = list.find(g => g.name.toLowerCase() === altName.toLowerCase() && g.name !== primaryGem.name);
          if (match && alternatives.length < 3) {
            alternatives.push({
              name: match.name,
              image: match.image,
              description: match.description,
              planetAssociation: match.planetAssociation
            });
          }
        });
      }
      
      // Fill in remaining alternatives if Gemini returned less than 3
      if (alternatives.length < 3) {
        list.forEach(g => {
          if (g.name !== primaryGem.name && !alternatives.find(a => a.name === g.name) && alternatives.length < 3) {
            alternatives.push({
              name: g.name,
              image: g.image,
              description: g.description,
              planetAssociation: g.planetAssociation
            });
          }
        });
      }

      return {
        zodiacSign: geminiOutput.zodiacSign || zodiac,
        recommendedGemstone: {
          name: primaryGem.name,
          image: primaryGem.image,
          description: geminiOutput.explanation || primaryGem.description,
          benefits: primaryGem.benefits,
          planetAssociation: primaryGem.planetAssociation,
          zodiacCompatibility: primaryGem.zodiacCompatibility,
          wearingMethod: primaryGem.wearingMethod,
          recommendedMetal: primaryGem.recommendedMetal || planetRule.luckyMetal,
          recommendedFinger: primaryGem.recommendedFinger || planetRule.luckyFinger,
          recommendedDay: primaryGem.recommendedDay || planetRule.luckyDay,
          confidenceScore: geminiOutput.confidenceScore || 90
        },
        alternativeGemstones: alternatives
      };
    } else {
      console.log('Gemini AI recommendation failed or returned null, falling back to local engine...');
    }
  }

  // LOCAL ENGINE FALLBACK
  // Find the primary gemstone that corresponds to the ruling planet or compatible zodiac
  let primaryGem = list.find(g => {
    const zodiacs = Array.isArray(g.zodiacCompatibility) 
      ? g.zodiacCompatibility.map(z => z.toLowerCase()) 
      : [];
    return zodiacs.includes(zodiac.toLowerCase());
  });

  // If no zodiac match, try matching by planet
  if (!primaryGem) {
    primaryGem = list.find(g => g.planetAssociation.toLowerCase() === planetRule.planet.toLowerCase());
  }

  // Fallback to Yellow Sapphire if none matches
  if (!primaryGem) {
    primaryGem = list[2]; 
  }

  // Find alternatives: select gemstones with different planetary rules
  const alternatives = list
    .filter(g => g.name !== primaryGem.name)
    .slice(0, 3)
    .map(g => ({
      name: g.name,
      image: g.image,
      description: g.description,
      planetAssociation: g.planetAssociation
    }));

  // Calculate confidence score based on input goals matching primary gemstone's planet/benefits
  let baseScore = 88;
  if (careerGoals && (primaryGem.planetAssociation === 'Jupiter' || primaryGem.planetAssociation === 'Sun')) {
    baseScore += 5;
  }
  if (financialGoals && (primaryGem.planetAssociation === 'Venus' || primaryGem.planetAssociation === 'Mercury')) {
    baseScore += 4;
  }
  if (healthConcerns && (primaryGem.planetAssociation === 'Mars' || primaryGem.planetAssociation === 'Moon')) {
    baseScore += 3;
  }
  
  // Cap between 85 and 98
  const confidenceScore = Math.min(Math.max(baseScore, 85), 98);

  return {
    zodiacSign: zodiac,
    recommendedGemstone: {
      name: primaryGem.name,
      image: primaryGem.image,
      description: primaryGem.description,
      benefits: primaryGem.benefits,
      planetAssociation: primaryGem.planetAssociation,
      zodiacCompatibility: primaryGem.zodiacCompatibility,
      wearingMethod: primaryGem.wearingMethod,
      recommendedMetal: primaryGem.recommendedMetal || planetRule.luckyMetal,
      recommendedFinger: primaryGem.recommendedFinger || planetRule.luckyFinger,
      recommendedDay: primaryGem.recommendedDay || planetRule.luckyDay,
      confidenceScore
    },
    alternativeGemstones: alternatives
  };
};

module.exports = {
  getZodiacSign,
  getPlanetaryRule,
  runRecommendation
};
