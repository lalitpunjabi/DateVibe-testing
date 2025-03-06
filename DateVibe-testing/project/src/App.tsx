import React, { useState } from "react";
import {
  Calendar,
  Heart,
  Clock,
  Utensils,
  Music,
  Wine,
  Cake,
  Flower2,
  Building2,
  DollarSign,
  Sparkles,
  Gift,
  Zap,
  Palette as ThemePalette,
} from "lucide-react";

type DateOption = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  category: string;
  color: string;
  priceRange: string;
  moodTags: string[];
  specialOccasion?: string[];
  details: {
    [key: string]: string[];
  };
};

type Budget = {
  min: number;
  max: number;
};

type DateMood =
  | "Romantic"
  | "Adventurous"
  | "Relaxed"
  | "Energetic"
  | "Sophisticated"
  | "Playful";

// Move getPriceValue function before it's used
const getPriceValue = (range: string): number => {
  switch (range) {
    case "$":
      return 25;
    case "$$":
      return 75;
    case "$$$":
      return 150;
    case "$$$$":
      return 300;
    default:
      return 0;
  }
};

const dateOptions: DateOption[] = [
  {
    id: 1,
    title: "Fine Dining Experience",
    description:
      "Create an elegant dining experience at a top-rated restaurant",
    icon: <Utensils className="w-6 h-6" />,
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=2070",
    category: "Restaurant",
    color: "bg-emerald-500",
    priceRange: "$$$",
    moodTags: ["Romantic", "Sophisticated"],
    specialOccasion: ["Anniversary", "Birthday", "Proposal"],
    details: {
      "Cuisine Types": [
        "Italian",
        "French",
        "Japanese",
        "Contemporary",
        "Mediterranean",
      ],
      Ambiance: ["Romantic", "Candlelit", "Waterfront", "Rooftop", "Garden"],
      "Special Requests": [
        "Private Booth",
        "Window Seat",
        "Chef's Table",
        "Wine Pairing",
        "Personalized Menu",
      ],
      "Dietary Options": [
        "Vegetarian",
        "Vegan",
        "Gluten-Free",
        "Seafood",
        "Halal",
      ],
      "Experience Add-ons": [
        "Live Cooking Show",
        "Wine Flight",
        "Dessert Tasting",
        "Chef's Greeting",
      ],
    },
  },
  {
    id: 2,
    title: "Musical Evening",
    description: "Set the perfect mood with live music and entertainment",
    icon: <Music className="w-6 h-6" />,
    image:
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=80&w=2070",
    category: "Entertainment",
    color: "bg-purple-500",
    priceRange: "$$",
    moodTags: ["Romantic", "Relaxed"],
    details: {
      "Music Genres": [
        "Jazz",
        "Classical",
        "Acoustic",
        "Piano Bar",
        "Live Band",
      ],
      Venues: [
        "Concert Hall",
        "Jazz Club",
        "Intimate Lounge",
        "Outdoor Concert",
        "Piano Bar",
      ],
      "Performance Types": [
        "Solo Artist",
        "Band",
        "Orchestra",
        "DJ Set",
        "Open Mic",
      ],
      "Seating Options": ["VIP Section", "Front Row", "Balcony", "Lounge Area"],
    },
  },
  {
    id: 3,
    title: "Cocktail Experience",
    description: "Explore craft cocktails and premium beverages",
    icon: <Wine className="w-6 h-6" />,
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=2069",
    category: "Drinks",
    color: "bg-rose-500",
    priceRange: "$$",
    moodTags: ["Sophisticated", "Romantic"],
    details: {
      "Drink Types": [
        "Craft Cocktails",
        "Wine Selection",
        "Champagne",
        "Mocktails",
        "Artisanal Beer",
      ],
      "Bar Atmosphere": [
        "Speakeasy",
        "Rooftop Bar",
        "Wine Cellar",
        "Garden Bar",
        "Lounge",
      ],
      Experiences: [
        "Cocktail Making Class",
        "Wine Tasting",
        "Mixology Session",
      ],
      Accompaniments: [
        "Cheese Board",
        "Tapas",
        "Bar Snacks",
        "Dessert Pairing",
      ],
    },
  },
  {
    id: 4,
    title: "Dessert Delights",
    description: "Indulge in sweet treats and dessert specialties",
    icon: <Cake className="w-6 h-6" />,
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=2070",
    category: "Food",
    color: "bg-amber-500",
    priceRange: "$$",
    moodTags: ["Playful", "Romantic"],
    details: {
      "Dessert Types": [
        "Chocolate Specialties",
        "Pastries",
        "Ice Cream",
        "Cakes",
        "French Desserts",
      ],
      Settings: ["Dessert Bar", "Café", "Chocolate Lounge", "Patisserie"],
      "Special Options": [
        "Sharing Platters",
        "Tasting Menu",
        "Custom Cake",
        "Chocolate Fondue",
      ],
      "Dietary Choices": ["Gluten-Free", "Vegan", "Sugar-Free", "Organic"],
    },
  },
  {
    id: 5,
    title: "Romantic Decorations",
    description: "Create the perfect ambiance with beautiful decorations",
    icon: <Flower2 className="w-6 h-6" />,
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=2070",
    category: "Decorations",
    color: "bg-pink-500",
    priceRange: "$$",
    moodTags: ["Romantic", "Sophisticated"],
    details: {
      Themes: [
        "Classic Romance",
        "Modern Elegance",
        "Rustic Charm",
        "Garden Romance",
        "Vintage",
      ],
      "Floral Options": [
        "Rose Arrangements",
        "Mixed Bouquets",
        "Table Centerpieces",
        "Flower Petals",
      ],
      Lighting: ["Candles", "Fairy Lights", "Lanterns", "Mood Lighting"],
      "Extra Touches": [
        "Personalized Messages",
        "Photo Displays",
        "Custom Decorations",
      ],
    },
  },
  {
    id: 6,
    title: "Unique Venues",
    description: "Discover extraordinary locations for your special date",
    icon: <Building2 className="w-6 h-6" />,
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2070",
    category: "Venue",
    color: "bg-blue-500",
    priceRange: "$$$",
    moodTags: ["Romantic", "Sophisticated"],
    details: {
      "Location Types": [
        "Rooftop",
        "Garden",
        "Beachfront",
        "Historic Building",
        "Modern Space",
      ],
      Settings: [
        "Indoor",
        "Outdoor",
        "Semi-Private",
        "Private Room",
        "Full Venue",
      ],
      Features: [
        "Scenic View",
        "Private Access",
        "Photo Opportunities",
        "Exclusive Use",
      ],
      Amenities: [
        "Valet Parking",
        "Coat Check",
        "Private Staff",
        "Custom Setup",
      ],
    },
  },
];

function App() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<DateOption | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [selectedDetails, setSelectedDetails] = useState<{
    [key: string]: string;
  }>({});
  const [budget, setBudget] = useState<Budget>({ min: 50, max: 200 });
  const [selectedMood, setSelectedMood] = useState<DateMood>("Romantic");
  const [specialOccasion, setSpecialOccasion] = useState<string>("");
  const [isAIRecommending, setIsAIRecommending] = useState<boolean>(false);

  const categories = Array.from(
    new Set(dateOptions.map((option) => option.category))
  );
  const moods: DateMood[] = [
    "Romantic",
    "Adventurous",
    "Relaxed",
    "Energetic",
    "Sophisticated",
    "Playful",
  ];
  const occasions = [
    "Anniversary",
    "Birthday",
    "First Date",
    "Proposal",
    "Valentine's Day",
    "Regular Date",
  ];

  const filteredOptions = dateOptions
    .filter((option) => filter === "all" || option.category === filter)
    .filter((option) => {
      const priceMatch =
        getPriceValue(option.priceRange) <= budget.max &&
        getPriceValue(option.priceRange) >= budget.min;
      const moodMatch = option.moodTags.includes(selectedMood);
      const occasionMatch =
        !specialOccasion ||
        (option.specialOccasion?.includes(specialOccasion) ?? false);
      return priceMatch && moodMatch && occasionMatch;
    });

  const handleDetailSelection = (category: string, detail: string) => {
    setSelectedDetails((prev) => ({
      ...prev,
      [category]: detail,
    }));
  };

  const getAIRecommendation = () => {
    setIsAIRecommending(true);
    setTimeout(() => {
      const recommendedOption = dateOptions.find(
        (option) =>
          option.moodTags.includes(selectedMood) &&
          getPriceValue(option.priceRange) <= budget.max
      );
      if (recommendedOption) {
        setSelectedOption(recommendedOption);
        setSelectedDetails({});
      }
      setIsAIRecommending(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-amber-50">
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-violet-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-violet-600 animate-pulse" />
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 text-transparent bg-clip-text">
                DateVibe
              </span>
            </div>
            <button
              onClick={getAIRecommendation}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-lg hover:from-violet-700 hover:to-pink-700 transition-all"
            >
              {isAIRecommending ? (
                <div className="flex items-center">
                  <div className="animate-spin mr-2">
                    <Zap className="w-4 h-4" />
                  </div>
                  Getting AI Recommendation...
                </div>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get AI Recommendation
                </>
              )}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-violet-600 via-pink-600 to-amber-600 text-transparent bg-clip-text">
            Plan Your Perfect Date
          </h1>
          <p className="text-lg text-gray-600">
            Customize every detail for an unforgettable experience
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-violet-600 transition-colors">
                  <Calendar className="w-4 h-4 inline-block mr-2" />
                  Pick Your Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-violet-600 transition-colors">
                  <Clock className="w-4 h-4 inline-block mr-2" />
                  Choose Time
                </label>
                <input
                  type="time"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-violet-600 transition-colors">
                  <DollarSign className="w-4 h-4 inline-block mr-2" />
                  Budget Range
                </label>
                <div className="flex gap-4">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-1/2 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    value={budget.min}
                    onChange={(e) =>
                      setBudget((prev) => ({
                        ...prev,
                        min: parseInt(e.target.value) || 0,
                      }))
                    }
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-1/2 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    value={budget.max}
                    onChange={(e) =>
                      setBudget((prev) => ({
                        ...prev,
                        max: parseInt(e.target.value) || 0,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-violet-600 transition-colors">
                  <ThemePalette className="w-4 h-4 inline-block mr-2" />
                  Date Mood
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  value={selectedMood}
                  onChange={(e) => setSelectedMood(e.target.value as DateMood)}
                >
                  {moods.map((mood) => (
                    <option key={mood} value={mood}>
                      {mood}
                    </option>
                  ))}
                </select>
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-violet-600 transition-colors">
                  <Gift className="w-4 h-4 inline-block mr-2" />
                  Special Occasion
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  value={specialOccasion}
                  onChange={(e) => setSpecialOccasion(e.target.value)}
                >
                  <option value="">Select Occasion</option>
                  {occasions.map((occasion) => (
                    <option key={occasion} value={occasion}>
                      {occasion}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="bg-gradient-to-br from-violet-50 to-pink-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Your Date Summary
              </h3>
              <div className="space-y-4 text-gray-600">
                <p className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-violet-500" />
                  {selectedDate
                    ? new Date(selectedDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Pick a date"}
                </p>
                <p className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-violet-500" />
                  {selectedTime ? selectedTime : "Choose time"}
                </p>
                <p className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-violet-500" />
                  Budget: ${budget.min} - ${budget.max}
                </p>
                <p className="flex items-center">
                  <ThemePalette className="w-5 h-5 mr-2 text-violet-500" />
                  Mood: {selectedMood}
                </p>
                {specialOccasion && (
                  <p className="flex items-center">
                    <Gift className="w-5 h-5 mr-2 text-violet-500" />
                    Occasion: {specialOccasion}
                  </p>
                )}
                {selectedOption && (
                  <div className="mt-4 p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-gray-900">
                      {selectedOption.title}
                    </h4>
                    <p className="text-sm text-gray-500 mb-3">
                      {selectedOption.description}
                    </p>
                    {Object.entries(selectedDetails).map(
                      ([category, detail]) => (
                        <div key={category} className="text-sm">
                          <span className="font-medium">{category}:</span>{" "}
                          {detail}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <section className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
              Customize Your Date
            </h2>
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${
                    filter === "all"
                      ? "bg-violet-600 text-white"
                      : "bg-white/80 text-gray-600 hover:bg-violet-100"
                  }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${
                      filter === category
                        ? "bg-violet-600 text-white"
                        : "bg-white/80 text-gray-600 hover:bg-violet-100"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOptions.map((option) => (
              <div
                key={option.id}
                className="group bg-white/80 backdrop-blur-md rounded-xl shadow-md overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={option.image}
                    alt={option.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className={`absolute top-4 right-4 ${option.color} text-white text-xs px-2 py-1 rounded-full`}
                  >
                    {option.category}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                    {option.priceRange}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <div className="p-2 rounded-lg bg-violet-50 text-violet-600">
                      {option.icon}
                    </div>
                    <h3 className="ml-3 text-lg font-semibold text-gray-900">
                      {option.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {option.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {option.moodTags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-violet-100 text-violet-600 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {selectedOption?.id === option.id ? (
                    <div className="space-y-3">
                      {Object.entries(option.details).map(
                        ([category, choices]) => (
                          <div key={category}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {category}
                            </label>
                            <select
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                              onChange={(e) =>
                                handleDetailSelection(category, e.target.value)
                              }
                              value={selectedDetails[category] || ""}
                            >
                              <option value="">Select {category}</option>
                              {choices.map((choice) => (
                                <option key={choice} value={choice}>
                                  {choice}
                                </option>
                              ))}
                            </select>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedOption(option);
                        setSelectedDetails({});
                      }}
                      className="w-full bg-gradient-to-r from-violet-600 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-violet-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      Customize Options
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-white/80 backdrop-blur-md border-t border-violet-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p className="flex items-center justify-center">
              Made with <Heart className="w-4 h-4 mx-2 text-pink-500" /> by
              DateVibe
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
