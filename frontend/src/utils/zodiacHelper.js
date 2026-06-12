export const getZodiacDetails = (dobString) => {
  if (!dobString) {
    return {
      sign: 'Aries',
      planet: 'Mars',
      gemstone: 'Red Coral',
      color: 'Crimson Red',
      number: '9, 6',
      traits: 'Energetic, Courageous, Ambitious, Impulsive',
      strengths: 'Confidence, courage, determination, honesty',
      weaknesses: 'Impatience, moodiness, short temper, impulsiveness',
      compatible: 'Leo, Sagittarius, Gemini',
      description: 'Aries is the first sign of the zodiac, representing new beginnings, energy, and leadership. Ruled by Mars, Aries individuals are passionate, direct, and love taking on new challenges.'
    };
  }

  const date = new Date(dobString);
  if (isNaN(date.getTime())) {
    return getZodiacDetails(null);
  }

  const month = date.getMonth() + 1;
  const day = date.getDate();

  let sign = 'Aries';
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) sign = 'Aries';
  else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) sign = 'Taurus';
  else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) sign = 'Gemini';
  else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) sign = 'Cancer';
  else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) sign = 'Leo';
  else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) sign = 'Virgo';
  else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) sign = 'Libra';
  else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) sign = 'Scorpio';
  else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) sign = 'Sagittarius';
  else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) sign = 'Capricorn';
  else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) sign = 'Aquarius';
  else sign = 'Pisces';

  const details = {
    Aries: {
      sign: 'Aries',
      planet: 'Mars',
      gemstone: 'Red Coral',
      color: 'Red, Crimson',
      number: '9, 6',
      traits: 'Energetic, Courageous, Ambitious, Impulsive',
      strengths: 'Confidence, courage, determination, honesty, passion',
      weaknesses: 'Impatience, short temper, impulsiveness, aggressiveness',
      compatible: 'Leo, Sagittarius, Gemini',
      description: 'Aries is a passionate, motivated, and confident leader who builds community with their cheerful disposition and relentless determination. Ruled by Mars, they are always ready for action.'
    },
    Taurus: {
      sign: 'Taurus',
      planet: 'Venus',
      gemstone: 'Diamond / White Sapphire / Opal',
      color: 'Pink, Green',
      number: '5, 6',
      traits: 'Reliable, Practical, Patient, Stubborn',
      strengths: 'Dependable, patient, musical, practical, devoted',
      weaknesses: 'Stubborn, possessive, uncompromising, lazy at times',
      compatible: 'Virgo, Capricorn, Cancer',
      description: 'Taurus is an earth sign represented by the bull. Like their celestial animal, Taureans enjoy relaxing in serene, rustic environments, surrounded by soft sounds, soothing aromas, and succulent flavors.'
    },
    Gemini: {
      sign: 'Gemini',
      planet: 'Mercury',
      gemstone: 'Emerald',
      color: 'Light Green, Yellow',
      number: '3, 5',
      traits: 'Adaptable, Outgoing, Smart, Indecisive',
      strengths: 'Gentle, affectionate, curious, adaptable, quick-witted',
      weaknesses: 'Nervous, inconsistent, indecisive, superficial',
      compatible: 'Libra, Aquarius, Leo',
      description: 'Playful and intellectually curious, Gemini is constantly juggling a variety of passions, hobbies, careers, and social groups. They are the social butterflies of the zodiac.'
    },
    Cancer: {
      sign: 'Cancer',
      planet: 'Moon',
      gemstone: 'Pearl',
      color: 'White, Silver',
      number: '2, 7',
      traits: 'Intuitive, Compassionate, Protective, Moody',
      strengths: 'Highly imaginative, loyal, sympathetic, persuasive',
      weaknesses: 'Moody, pessimistic, suspicious, insecure, manipulative',
      compatible: 'Taurus, Scorpio, Pisces',
      description: 'Cancer is a cardinal water sign. Represented by the crab, this oceanic crustacean seamlessly exists in both emotional and material realms. Cancers are highly intuitive and protective.'
    },
    Leo: {
      sign: 'Leo',
      planet: 'Sun',
      gemstone: 'Ruby',
      color: 'Gold, Orange, Yellow',
      number: '1, 4',
      traits: 'Generous, Warm-hearted, Creative, Domineering',
      strengths: 'Creative, passionate, generous, warm-hearted, cheerful',
      weaknesses: 'Arrogant, stubborn, self-centered, lazy, inflexible',
      compatible: 'Aries, Sagittarius, Libra',
      description: 'Leo is represented by the lion, and these spirited fire signs are the kings and queens of the celestial jungle. They are delighted to embrace their royal status: Vivacious, theatrical, and passionate.'
    },
    Virgo: {
      sign: 'Virgo',
      planet: 'Mercury',
      gemstone: 'Emerald',
      color: 'Green, White',
      number: '5, 3',
      traits: 'Loyal, Analytical, Kind, Overcritical',
      strengths: 'Loyal, analytical, kind, hardworking, practical, smart',
      weaknesses: 'Shyness, worry, overcritical of self and others',
      compatible: 'Taurus, Capricorn, Scorpio',
      description: 'Virgos are logical, practical, and systematic in their approach to life. This earth sign is a perfectionist at heart and isn’t afraid to improve skills through diligent practice.'
    },
    Libra: {
      sign: 'Libra',
      planet: 'Venus',
      gemstone: 'Opal / Diamond',
      color: 'Blue, Lavender',
      number: '6, 5',
      traits: 'Diplomatic, Gracious, Social, Self-pitying',
      strengths: 'Cooperative, diplomatic, gracious, fair-minded, social',
      weaknesses: 'Indecisive, avoids confrontations, will carry a grudge',
      compatible: 'Gemini, Aquarius, Sagittarius',
      description: 'Balance, harmony, and justice define Libra energy. As a cardinal air sign, Libra is represented by the scales, indicating a fixation on establishing equilibrium in all areas of life.'
    },
    Scorpio: {
      sign: 'Scorpio',
      planet: 'Mars',
      gemstone: 'Red Coral',
      color: 'Scarlet, Rust',
      number: '9, 2',
      traits: 'Brave, Passionate, Resourceful, Distrusting',
      strengths: 'Resourceful, brave, passionate, stubborn, a true friend',
      weaknesses: 'Distrusting, jealous, secretive, violent',
      compatible: 'Cancer, Pisces, Virgo',
      description: 'Scorpio is a water sign that uses emotional energy as fuel, cultivating powerful wisdom in both the physical and unseen realms. They possess intense focus, passion, and personal power.'
    },
    Sagittarius: {
      sign: 'Sagittarius',
      planet: 'Jupiter',
      gemstone: 'Yellow Sapphire / Topaz',
      color: 'Violet, Purple, Blue',
      number: '3, 5',
      traits: 'Optimistic, Funny, Generous, Impatient',
      strengths: 'Generous, idealistic, great sense of humor',
      weaknesses: 'Promises more than can deliver, very impatient, blunt',
      compatible: 'Aries, Leo, Libra',
      description: 'Represented by the archer, Sagittarians are always on a quest for knowledge. As the final fire sign of the zodiac, Sagittarius launches its pursuits like blazing arrows, chasing adventures.'
    },
    Capricorn: {
      sign: 'Capricorn',
      planet: 'Saturn',
      gemstone: 'Blue Sapphire',
      color: 'Brown, Black, Grey',
      number: '8, 4',
      traits: 'Disciplined, Responsible, Patient, Cynical',
      strengths: 'Responsible, disciplined, self-control, good managers',
      weaknesses: 'Know-it-all, unforgiving, condescending, expecting the worst',
      compatible: 'Taurus, Virgo, Pisces',
      description: 'The last earth sign of the zodiac, Capricorn is represented by the sea-goat, a mythological creature with the body of a goat and the tail of a fish. Capricorn is skilled at navigating both emotional and material goals.'
    },
    Aquarius: {
      sign: 'Aquarius',
      planet: 'Saturn',
      gemstone: 'Amethyst / Blue Sapphire',
      color: 'Blue, Turquoise',
      number: '8, 3',
      traits: 'Progressive, Original, Independent, Aloof',
      strengths: 'Progressive, original, independent, humanitarian',
      weaknesses: 'Runs from emotional expression, temperamental, uncompromising',
      compatible: 'Gemini, Libra, Aries',
      description: 'Despite the "aqua" in its name, Aquarius is actually the last air sign of the zodiac. Aquarius is represented by the water bearer, the mystical healer who bestows water, or life, upon the land.'
    },
    Pisces: {
      sign: 'Pisces',
      planet: 'Jupiter',
      gemstone: 'Yellow Sapphire',
      color: 'Sea Green, Mauve',
      number: '7, 3',
      traits: 'Compassionate, Artistic, Gentle, Fearful',
      strengths: 'Compassionate, artistic, intuitive, gentle, wise',
      weaknesses: 'Fearful, overly trusting, sad, desire to escape reality',
      compatible: 'Cancer, Scorpio, Taurus',
      description: 'Pisces is the final water sign of the zodiac, symbolized by two fish swimming in opposite directions. Pisces energy represents the culmination of all lessons, feelings, strengths, and weaknesses of the other signs.'
    }
  };

  return details[sign] || details['Aries'];
};
