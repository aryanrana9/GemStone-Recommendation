const Gemstone = require('../models/Gemstone');
const Horoscope = require('../models/Horoscope');

const gemstonesData = [
  {
    name: 'Ruby',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=400',
    description: 'A premium crimson gemstone representing the Sun, bringing leadership, power, and courage.',
    benefits: ['Enhances leadership and authority qualities', 'Improves physical energy, vitality, and stamina', 'Brings fame, recognition, and self-confidence'],
    zodiacCompatibility: ['Leo', 'Aries', 'Sagittarius'],
    planetAssociation: 'Sun',
    wearingMethod: 'Wash in raw milk and holy Gangajal, chant Surya Mantra (Om Hram Hreem Hroum Sah Suryaya Namah) 108 times, and wear on Sunday sunrise.',
    recommendedMetal: 'Gold',
    recommendedFinger: 'Ring Finger',
    recommendedDay: 'Sunday',
    careInstructions: 'Clean with warm soapy water and a soft micro-fiber cloth. Avoid extreme heat or hard impacts.'
  },
  {
    name: 'Emerald',
    image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&q=80&w=400',
    description: 'A vibrant green gemstone connected to Mercury, enhancing wisdom, logic, and communications.',
    benefits: ['Boosts communication, public speaking, and writing skills', 'Improves intelligence, analytical logic, and math', 'Aids in business growth and financial wisdom'],
    zodiacCompatibility: ['Gemini', 'Virgo', 'Taurus', 'Libra'],
    planetAssociation: 'Mercury',
    wearingMethod: 'Wash in holy water, chant Budh Mantra (Om Bram Breem Broum Sah Budhaya Namah) 108 times, and wear on Wednesday after sunrise.',
    recommendedMetal: 'Gold or Silver',
    recommendedFinger: 'Little Finger',
    recommendedDay: 'Wednesday',
    careInstructions: 'Emeralds can be fragile. Clean with a soft, dry cloth. Do not use steam cleaning or ultrasonic cleaners.'
  },
  {
    name: 'Yellow Sapphire',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400',
    description: 'A premium yellow gemstone symbolizing Jupiter, bringing wisdom, spiritual growth, and prosperity.',
    benefits: ['Brings massive financial prosperity and wealth', 'Enhances wisdom, academic excellence, and knowledge', 'Aids in career promotions, luck, and positive marriages'],
    zodiacCompatibility: ['Sagittarius', 'Pisces', 'Aries', 'Leo'],
    planetAssociation: 'Jupiter',
    wearingMethod: 'Purify with holy water, chant Guru Mantra (Om Gram Greem Groum Sah Gurave Namah) 108 times, and wear on Thursday morning.',
    recommendedMetal: 'Gold',
    recommendedFinger: 'Index Finger',
    recommendedDay: 'Thursday',
    careInstructions: 'Avoid direct contact with household chemicals. Clean using warm water and mild liquid soap.'
  },
  {
    name: 'Blue Sapphire',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=400',
    description: 'The fastest acting gemstone representing Saturn, offering protection, focus, and rapid success.',
    benefits: ['Offers strong shield of protection against negative energies', 'Improves concentration, mental clarity, and focus', 'Brings sudden prosperity, career breakthrough, and stability'],
    zodiacCompatibility: ['Capricorn', 'Aquarius', 'Taurus', 'Libra'],
    planetAssociation: 'Saturn',
    wearingMethod: 'Wash in mustard oil and raw water, chant Shani Mantra (Om Pram Preem Proum Sah Shanishcharaya Namah) 108 times, and wear on Saturday evening.',
    recommendedMetal: 'Iron or Silver',
    recommendedFinger: 'Middle Finger',
    recommendedDay: 'Saturday',
    careInstructions: 'Very durable. Clean with soapy warm water and soft brush. Rinse thoroughly.'
  },
  {
    name: 'Pearl',
    image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=400',
    description: 'A soothing organic gemstone embodying the Moon, bringing mental stability, peace, and emotional balance.',
    benefits: ['Calms anger, depression, and mental anxiety', 'Improves relations with mother and family stability', 'Provides emotional clarity, focus, and cool-mindedness'],
    zodiacCompatibility: ['Cancer', 'Pisces', 'Scorpio'],
    planetAssociation: 'Moon',
    wearingMethod: 'Purify in raw milk, chant Chandra Mantra (Om Shram Shreem Shroum Sah Chandraya Namah) 108 times, and wear on a Monday morning.',
    recommendedMetal: 'Silver',
    recommendedFinger: 'Little Finger',
    recommendedDay: 'Monday',
    careInstructions: 'Very soft. Clean with mild soapy water. Store in a soft pouch away from hard jewelry.'
  },
  {
    name: 'Red Coral',
    image: 'https://images.unsplash.com/photo-1535401991746-da3d9055713e?auto=format&fit=crop&q=80&w=400',
    description: 'An organic red gemstone representing Mars, boosting physical energy, courage, and victory.',
    benefits: ['Enhances courage, leadership, and stamina', 'Overcomes fears, bad dreams, and active enemies', 'Improves blood circulation and muscle health'],
    zodiacCompatibility: ['Aries', 'Scorpio', 'Cancer', 'Leo'],
    planetAssociation: 'Mars',
    wearingMethod: 'Purify in Ganga water, chant Mangal Mantra (Om Kram Kreem Kroum Sah Bhaumaya Namah) 108 times, and wear on Tuesday morning.',
    recommendedMetal: 'Copper or Gold',
    recommendedFinger: 'Ring Finger',
    recommendedDay: 'Tuesday',
    careInstructions: 'Sensitive to acids. Avoid contact with perfumes. Wipe with a damp soft cloth.'
  },
  {
    name: 'Diamond',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=400',
    description: 'A brilliant precious crystal representing Venus, bringing romance, artistic flair, and extreme luxury.',
    benefits: ['Brings luxury, comfort, and financial growth', 'Enhances romance, marriage harmony, and marital bliss', 'Improves creative skills and artistic talent'],
    zodiacCompatibility: ['Taurus', 'Libra', 'Gemini', 'Aquarius'],
    planetAssociation: 'Venus',
    wearingMethod: 'Wash in rose water, chant Shukra Mantra (Om Dram Dreem Droum Sah Shukraya Namah) 108 times, and wear on Friday morning.',
    recommendedMetal: 'White Gold or Platinum',
    recommendedFinger: 'Middle or Ring Finger',
    recommendedDay: 'Friday',
    careInstructions: 'Extremely durable. However, grease can stick to the surface. Clean regularly with liquid soap and warm water.'
  },
  {
    name: 'Opal',
    image: 'https://images.unsplash.com/photo-1551270276-8098ad80f2d5?auto=format&fit=crop&q=80&w=400',
    description: 'A dazzling white stone with shifting colors representing Venus, boosting luxury, beauty, and creativity.',
    benefits: ['Enhances creative skills and original expression', 'Brings luxury, comforts, and high social status', 'Improves romance and resolving relationship issues'],
    zodiacCompatibility: ['Taurus', 'Libra', 'Gemini', 'Aquarius'],
    planetAssociation: 'Venus',
    wearingMethod: 'Wash in rose water, chant Shukra Mantra (Om Dram Dreem Droum Sah Shukraya Namah) 108 times, and wear on Friday morning.',
    recommendedMetal: 'Silver or Platinum',
    recommendedFinger: 'Middle or Ring Finger',
    recommendedDay: 'Friday',
    careInstructions: 'Contains water. Keep away from intense heat and direct sunlight to prevent cracking. Clean with damp cloth.'
  },
  {
    name: 'Amethyst',
    image: 'https://images.unsplash.com/photo-1523450001312-faa4e2e31f07?auto=format&fit=crop&q=80&w=400',
    description: 'A purple quartz representing Saturn, boosting calmness, spiritual growth, and relief from addictions.',
    benefits: ['Calms overactive minds and reduces anxiety', 'Provides spiritual protection and clear wisdom', 'Helps overcome bad habits, negative thoughts, and addictions'],
    zodiacCompatibility: ['Aquarius', 'Capricorn', 'Aries'],
    planetAssociation: 'Saturn',
    wearingMethod: 'Wash in clean running water, chant Shani Mantra (Om Pram Preem Proum Sah Shanishcharaya Namah) 108 times, and wear on Saturday evening.',
    recommendedMetal: 'Silver',
    recommendedFinger: 'Middle Finger',
    recommendedDay: 'Saturday',
    careInstructions: 'Avoid long exposure to direct heat or strong sunlight, which can fade the purple color.'
  },
  {
    name: 'Topaz',
    image: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=400',
    description: 'A brilliant gemstone representing Jupiter, bringing clarity of goals, leadership, and emotional peace.',
    benefits: ['Improves concentration and focus', 'Brings emotional healing and confidence', 'Supports leadership roles and analytical thinking'],
    zodiacCompatibility: ['Sagittarius', 'Scorpio', 'Aries'],
    planetAssociation: 'Jupiter',
    wearingMethod: 'Purify with Gangajal, chant Guru Mantra (Om Gram Greem Groum Sah Gurave Namah) 108 times, and wear on Thursday morning.',
    recommendedMetal: 'Gold or Silver',
    recommendedFinger: 'Index Finger',
    recommendedDay: 'Thursday',
    careInstructions: 'Avoid harsh temperature changes. Clean with warm soapy water and soft brush.'
  }
];

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const generateHoroscopes = () => {
  return zodiacSigns.map(sign => {
    return {
      zodiacSign: sign,
      daily: `Today, the cosmic alignments suggest that ${sign} individuals will experience an increase in mental clarity and focus. It is an excellent day to address complex tasks that you have been delaying. Your communication skills are highly supported by planetary transits, allowing you to resolve old disputes. Be mindful of minor expenditures, and prioritize your health by drinking plenty of water.`,
      weekly: `This week brings a wave of positive transformation for ${sign}. Professional commitments will require your focus, but you will find yourself highly motivated to achieve your milestones. Financial prospects look positive, with potential gains from past investments. Ensure you dedicate quality time to family and partners, as Saturn's influence highlights relationship stability.`,
      monthly: `The month ahead is filled with opportunities for growth and self-discovery. A key planet enters your ruling house, sparking creativity and inspiration. Career transitions look highly favorable, and those in business will see increased traction. Focus on financial budgeting during the middle of the month. Make sure to establish a routine that balances hard work with physical rest.`
    };
  });
};

const seedDatabase = async () => {
  try {
    const gemstoneCount = await Gemstone.countDocuments();
    if (gemstoneCount === 0) {
      await Gemstone.insertMany(gemstonesData);
      console.log('Gemstones successfully seeded!');
    } else {
      console.log('Gemstones already exist in database, skipping seed.');
    }

    const horoscopeCount = await Horoscope.countDocuments();
    if (horoscopeCount === 0) {
      const horoscopesData = generateHoroscopes();
      await Horoscope.insertMany(horoscopesData);
      console.log('Horoscopes successfully seeded!');
    } else {
      console.log('Horoscopes already exist in database, skipping seed.');
    }
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
};

module.exports = {
  seedDatabase
};
