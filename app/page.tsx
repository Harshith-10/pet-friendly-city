"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Add Instagram embed type definition
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

import {
  ArrowRight,
  Heart,
  Shield,
  Utensils,
  ParkingMeterIcon as Park,
  BookOpen,
  Building,
  Users,
  Package,
  Send,
  MessageCircle,
  X,
} from "lucide-react";

export default function Home() {
  // Refs for scroll animations
  const aboutRef = useRef<HTMLElement>(null);
  const objectivesRef = useRef<HTMLElement>(null);
  const initiativesRef = useRef<HTMLElement>(null);
  const impactRef = useRef<HTMLElement>(null);

  // State for chat box
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "bot",
      message:
        "Hello! I'm PawBuddy, your friendly guide to the Pet-Friendly City campaign. How can I help you today?",
    },
  ]);
  const [userMessage, setUserMessage] = useState("");

  // Function to handle sending messages in the chat
  const handleSendMessage = () => {
    if (userMessage.trim() === "") return;

    // Add user message to chat
    setChatMessages([
      ...chatMessages,
      { sender: "user", message: userMessage },
    ]);

    // Simulate bot response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          message:
            "Thanks for your message! Our team is working on making cities more pet-friendly. Would you like to learn more about our initiatives or how you can get involved?",
        },
      ]);
    }, 1000);

    setUserMessage("");
  };

  // Handle pressing Enter to send message
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Animation for elements that fade in on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = [
      aboutRef.current,
      objectivesRef.current,
      initiativesRef.current,
      impactRef.current,
    ];
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // Initialize Instagram embed
  useEffect(() => {
    // Check if the Instagram embed script is loaded
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else {
      // If not loaded yet, wait for it and then process
      const checkInsta = setInterval(() => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
          clearInterval(checkInsta);
        }
      }, 500);

      // Clear interval on component unmount
      return () => clearInterval(checkInsta);
    }
  }, []);

  return (
    <main className="min-h-screen bg-parchment">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-hunter-green">
        <div className="w-full px-4 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-xl font-bold tracking-tighter text-hunter-green"
          >
            🐶 PET-FRIENDLY CITY
          </Link>
          <div className="hidden md:flex space-x-4 md:space-x-8">
            <Link
              href="#about"
              className="text-sm uppercase tracking-widest hover:text-bittersweet hover:scale-105 transition-all"
            >
              About
            </Link>
            <Link
              href="#objectives"
              className="text-sm uppercase tracking-widest hover:text-bittersweet hover:scale-105 transition-all"
            >
              Objectives
            </Link>
            <Link
              href="#initiatives"
              className="text-sm uppercase tracking-widest hover:text-bittersweet hover:scale-105 transition-all"
            >
              Initiatives
            </Link>
            <Link
              href="#impact"
              className="text-sm uppercase tracking-widest hover:text-bittersweet hover:scale-105 transition-all"
            >
              Impact
            </Link>
            <Link
              href="#contact"
              className="text-sm uppercase tracking-widest hover:text-bittersweet hover:scale-105 transition-all"
            >
              Join Us
            </Link>
          </div>
          <button
            className="md:hidden p-2 text-hunter-green"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <motion.div
            initial={false}
            animate={isMenuOpen ? "open" : "closed"}
            variants={{
              open: { opacity: 1, y: 0, display: "flex" },
              closed: {
                opacity: 0,
                y: -20,
                transitionEnd: { display: "none" },
              },
            }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 w-full bg-white py-4 px-2 shadow-lg flex flex-col space-y-2"
          >
            <Link
              href="#about"
              className="text-sm uppercase tracking-widest hover:text-bittersweet transition-colors pl-4"
            >
              About
            </Link>
            <Link
              href="#objectives"
              className="text-sm uppercase tracking-widest hover:text-bittersweet transition-colors pl-4"
            >
              Objectives
            </Link>
            <Link
              href="#initiatives"
              className="text-sm uppercase tracking-widest hover:text-bittersweet transition-colors pl-4"
            >
              Initiatives
            </Link>
            <Link
              href="#impact"
              className="text-sm uppercase tracking-widest hover:text-bittersweet transition-colors pl-4"
            >
              Impact
            </Link>
            <Link
              href="#contact"
              className="text-sm uppercase tracking-widest hover:text-bittersweet transition-colors pl-4"
            >
              Join Us
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 px-4 pb-6 md:pb-12 container mx-auto">
        <div className="grid grid-cols-12 gap-4 px-4 md:px-0">
          <div className="col-span-12 md:col-span-7 mb-8 md:mb-0">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-none mb-6 text-hunter-green"
            >
              PET-
              <br />
              FRIENDLY
              <br />
              CITY
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-bittersweet mb-6 flex items-center"
            >
              Creating Pawsitive Change Together 🐾
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl max-w-xl text-hunter-green"
            >
              A nationwide initiative by CollegeTips.in transforming Indian
              cities into safe, welcoming environments for pets and stray
              animals.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 flex flex-wrap gap-2 md:gap-4 px-4 md:px-0"
            >
              <Link
                href="#contact"
                className="inline-flex rounded-sm items-center px-4 py-2 md:px-8 md:py-3 bg-bittersweet text-white text-sm uppercase tracking-widest hover:bg-hunter-green hover:scale-105 transition-all"
              >
                Join The Movement <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="#volunteer-form"
                className="inline-flex rounded-sm items-center px-4 py-2 md:px-8 md:py-3 bg-hunter-green text-white text-sm uppercase tracking-widest hover:bg-bittersweet hover:scale-105 transition-all"
              >
                Volunteer Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="#impact-stories"
                className="inline-flex rounded-sm items-center px-4 py-2 md:px-8 md:py-3 border-2 border-hunter-green text-hunter-green text-sm uppercase tracking-widest hover:bg-hunter-green hover:text-white hover:scale-105 transition-all"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="col-span-12 md:col-span-5 flex items-center justify-center"
          >
            <div className="relative w-full overflow-hidden">
              <div className="instagram-embed-container">
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink="https://www.instagram.com/reel/DIA-mB2SgZ8/?utm_source=ig_embed&amp;utm_campaign=loading"
                  data-instgrm-version="14"
                  style={{
                    background: "#FFF",
                    border: 0,
                    borderRadius: "3px",
                    boxShadow:
                      "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                    margin: "1px",
                    maxWidth: "540px",
                    minWidth: "326px",
                    padding: 0,
                    width: "calc(100% - 2px)",
                  }}
                >
                  <div style={{ padding: "16px" }}>
                    <a
                      href="https://www.instagram.com/reel/DIA-mB2SgZ8/?utm_source=ig_embed&amp;utm_campaign=loading"
                      style={{
                        background: "#FFFFFF",
                        lineHeight: 0,
                        padding: "0 0",
                        textAlign: "center",
                        textDecoration: "none",
                        width: "100%",
                      }}
                      target="_blank"
                    ></a>
                  </div>
                </blockquote>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className="py-20 px-4 md:px-8 bg-hunter-green text-white opacity-0 transition-opacity duration-1000"
      >
        <div className="container mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-12">
            ABOUT
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-xl mb-6">
                The "Pet-Friendly City" (PFC) initiative by CollegeTips.in is a
                nationwide campaign aimed at transforming Indian cities into
                safe, welcoming environments for pets and stray animals.
              </p>
              <p className="mb-6">
                Our approach focuses on community engagement, policy advocacy,
                legal enforcement, and educational programs to promote
                responsible pet ownership and animal welfare across the country.
              </p>
              <p className="mb-6">
                We believe that a city that cares for its animals reflects the
                compassion and progress of its society. Through collaborative
                efforts with local governments, NGOs, and citizens, we're
                creating sustainable change.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[16/9] rounded-xl relative overflow-hidden animate-levitate ">
                <img
                  src="/images/volunteers.png"
                  alt="Community volunteers helping stray animals"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section
        id="objectives"
        ref={objectivesRef}
        className="py-20 px-4 md:px-8 bg-parchment opacity-0 transition-opacity duration-1000"
      >
        <div className="container mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-12 text-hunter-green">
            OBJECTIVES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 px-4 md:px-0">
            {/* Objective 1 */}
            <div className="group">
              <div className="aspect-square rounded-xl bg-yellow-green mb-6 flex items-center justify-center group-hover:bg-bittersweet transition-colors duration-300">
                <Heart className="h-16 w-16 text-hunter-green group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-hunter-green">
                Zero Animal Cruelty
              </h3>
              <p className="text-hunter-green/80">
                Advocating for the prevention of animal suffering and protection
                from abuse.
              </p>
            </div>

            {/* Objective 2 */}
            <div className="group">
              <div className="aspect-square rounded-xl bg-yellow-green mb-6 flex items-center justify-center group-hover:bg-bittersweet transition-colors duration-300">
                <Shield className="h-16 w-16 text-hunter-green group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-hunter-green">
                Safety & Healthcare
              </h3>
              <p className="text-hunter-green/80">
                Ensuring accessible veterinary care and safe public spaces for
                animals.
              </p>
            </div>

            {/* Objective 3 */}
            <div className="group">
              <div className="aspect-square rounded-xl bg-yellow-green mb-6 flex items-center justify-center group-hover:bg-bittersweet transition-colors duration-300">
                <Utensils className="h-16 w-16 text-hunter-green group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-hunter-green">
                Availability of Food
              </h3>
              <p className="text-hunter-green/80">
                Collaborating with businesses and NGOs to provide regular food
                for strays.
              </p>
            </div>

            {/* Objective 4 */}
            <div className="group">
              <div className="aspect-square rounded-xl bg-yellow-green mb-6 flex items-center justify-center group-hover:bg-bittersweet transition-colors duration-300">
                <Park className="h-16 w-16 text-hunter-green group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-hunter-green">
                Pet-Friendly Spaces
              </h3>
              <p className="text-hunter-green/80">
                Developing parks and trails where pets can socialize safely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section
        id="initiatives"
        ref={initiativesRef}
        className="py-20 px-4 md:px-8 bg-asparagus text-white opacity-0 transition-opacity duration-1000"
      >
        <div className="container mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-12">
            INITIATIVES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-12">
              {/* Initiative 1 */}
              <div className="flex">
                <div className="mr-6">
                  <div className="w-16 h-16 rounded-md bg-parchment flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-bittersweet" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Awareness Drives</h3>
                  <p>
                    Conducting seminars and workshops to educate the public on
                    animal welfare and responsible pet ownership.
                  </p>
                </div>
              </div>

              {/* Initiative 2 */}
              <div className="flex">
                <div className="mr-6">
                  <div className="w-16 h-16 rounded-md bg-parchment flex items-center justify-center">
                    <Building className="h-8 w-8 text-bittersweet" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Public Policy Shift
                  </h3>
                  <p>
                    Working with government officials to implement
                    animal-friendly policies and infrastructure.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              {/* Initiative 3 */}
              <div className="flex">
                <div className="mr-6">
                  <div className="w-16 h-16 rounded-md bg-parchment flex items-center justify-center">
                    <Users className="h-8 w-8 text-bittersweet" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Joint Efforts</h3>
                  <p>
                    Organizing adoption drives and vaccination camps in
                    collaboration with NGOs and veterinary professionals.
                  </p>
                </div>
              </div>

              {/* Initiative 4 */}
              <div className="flex">
                <div className="mr-6">
                  <div className="w-16 h-16 rounded-md bg-parchment flex items-center justify-center">
                    <Package className="h-8 w-8 text-bittersweet" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Providing Resources
                  </h3>
                  <p>
                    Offering food, shelter, and medical care to stray and
                    rescued animals through community networks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section
        id="impact"
        ref={impactRef}
        className="py-20 px-4 md:px-8 bg-parchment opacity-0 transition-opacity duration-1000"
      >
        <div className="container mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-12 text-hunter-green">
            IMPACT
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Impact 1 */}
            <div className="text-center">
              <motion.div
                whileInView={{ scale: [0.9, 1.1, 1] }}
                transition={{ duration: 1 }}
                className="text-8xl font-bold text-bittersweet mb-4"
              >
                10+
              </motion.div>
              <h3 className="text-xl uppercase tracking-widest text-hunter-green">
                Cities Involved
              </h3>
            </div>

            {/* Impact 2 */}
            <div className="text-center">
              <motion.div
                whileInView={{ scale: [0.9, 1.1, 1] }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-8xl font-bold text-bittersweet mb-4"
              >
                25K+
              </motion.div>
              <h3 className="text-xl uppercase tracking-widest text-hunter-green">
                Volunteers
              </h3>
            </div>

            {/* Impact 3 */}
            <div className="text-center">
              <motion.div
                whileInView={{ scale: [0.9, 1.1, 1] }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-8xl font-bold text-bittersweet mb-4"
              >
                1M+
              </motion.div>
              <h3 className="text-xl uppercase tracking-widest text-hunter-green">
                Pet Lives Impacted
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Leader's Remarks Section */}
      <section className="py-20 px-4 md:px-8 bg-hunter-green text-white">
        <div className="container mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-12">
            LEADER'S REMARK!
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Leader's Remark 1 */}
            <div className="border-l-4 border-bittersweet pl-6">
              <p className="text-xl italic mb-6">
                "I have been told that Indian breed dogs are very good and
                competent. Among the Indian breeds, Mudhol hound and Himachali
                hound are high pedigree dogs. Rajapalayam, Kanni, Chippiparai
                and Combai are also very good Indian breeds. These dogs have
                also been inducted by Indian Security agencies."
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="/images/narendra-modi.png"
                  alt="Shree Narendra Modi"
                  className="w-12 h-12 rounded-full object-cover border-2 border-bittersweet"
                />
                <p className="font-bold">
                  Shree Narendra Modi
                  <br />
                  <span className="font-light text-sm">
                    Prime Minister of India
                  </span>
                </p>
              </div>
            </div>

            {/* Leader's Remark 2 */}
            <div className="border-l-4 border-bittersweet pl-6">
              <p className="text-xl italic mb-6">
                "Lord Krishna was called 'Gopal' out of love, and he found joy
                in being known as Gopal throughout his life due to his deep
                affection for cows. He adorned his crown with a peacock feather
                and always valued cows. By linking cow rearing to livelihood, he
                emphasized both an economic resource and a connection to the
                elixir of life."
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="/images/mohan-yadav.png"
                  alt="Dr. Mohan Yadav"
                  className="w-12 h-12 rounded-full object-cover border-2 border-bittersweet"
                />
                <p className="font-bold">
                  Dr. Mohan Yadav
                  <br />
                  <span className="font-light text-sm">
                    Chief Minister of MP
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 md:px-8 bg-parchment">
        <div className="container mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-12 text-hunter-green">
            GALLERY
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              className="aspect-square rounded-xl bg-yellow-green animate-levitate1 overflow-hidden"
            >
              <img
                src="https://cataas.com/cat"
                alt="Dog at park"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              className="aspect-square rounded-xl bg-yellow-green animate-levitate2 overflow-hidden"
            >
              <img
                src="https://cataas.com/cat?unique=2"
                alt="Volunteers feeding strays"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              className="aspect-square rounded-xl bg-yellow-green animate-levitate3 overflow-hidden"
            >
              <img
                src="https://cataas.com/cat?unique=3"
                alt="Vaccination camp"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              className="aspect-square rounded-xl bg-yellow-green animate-levitate4 overflow-hidden"
            >
              <img
                src="https://cataas.com/cat?unique=4"
                alt="Pet-friendly park"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Stories Section */}
      <section id="impact-stories" className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8 text-hunter-green">
            Impact Stories
          </h2>
          <p className="text-xl mb-12 max-w-3xl">
            Real stories of how our initiative is making a difference in the
            lives of animals and communities across India.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Story 1 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-parchment p-6 shadow-md rounded-lg"
            >
              <div className="aspect-video bg-yellow-green mb-6 overflow-hidden rounded-lg">
                <img
                  src="/images/dogs-playing-in-grass.jpg"
                  alt="Dogs playing in a park"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-hunter-green">
                Bangalore's First Pet Park
              </h3>
              <p className="text-hunter-green/80 mb-4">
                How community activism led to the creation of a dedicated space
                for pets to play and socialize safely.
              </p>
              <p className="text-sm text-bittersweet font-medium">
                June 15, 2023
              </p>
            </motion.div>

            {/* Story 2 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-parchment p-6 shadow-md rounded-lg"
            >
              <div className="aspect-video bg-yellow-green mb-6 overflow-hidden rounded-lg">
                <img
                  src="/images/cat-crossing-road.jpg"
                  alt="Cat crossing road safely"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-hunter-green">
                Street Animal Safety Initiative
              </h3>
              <p className="text-hunter-green/80 mb-4">
                How traffic awareness campaigns reduced animal accidents by 40%
                in Mumbai's busy streets.
              </p>
              <p className="text-sm text-bittersweet font-medium">
                August 3, 2023
              </p>
            </motion.div>

            {/* Story 3 - Placeholder for future updates */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-parchment p-6 shadow-md rounded-lg border-2 border-dashed border-yellow-green/50"
            >
              <div className="aspect-video bg-yellow-green/30 mb-6 overflow-hidden rounded-lg flex items-center justify-center">
                <p className="text-hunter-green font-medium">Coming Soon</p>
              </div>
              <h3 className="text-xl font-bold mb-2 text-hunter-green">
                Your Story Here
              </h3>
              <p className="text-hunter-green/80 mb-4">
                Have an inspiring pet-friendly success story? Share it with us
                and it might be featured here!
              </p>
              <Link
                href="#volunteer-form"
                className="text-sm text-bittersweet font-medium hover:underline"
              >
                Submit Your Story
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Volunteer Form Section */}
      <section id="volunteer-form" className="py-20 px-4 md:px-8 bg-parchment">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-hunter-green">
                Join Our Movement
              </h2>
              <p className="text-xl mb-8 text-hunter-green/80">
                Become a volunteer and help us create pet-friendly spaces in
                your city. Fill out the form to get started on your journey with
                us.
              </p>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-hunter-green">
                  What Volunteers Do
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-bittersweet">•</div>
                    <p>Participate in community awareness programs</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-bittersweet">•</div>
                    <p>Help organize adoption drives and vaccination camps</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-bittersweet">•</div>
                    <p>Assist in feeding programs for stray animals</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-bittersweet">•</div>
                    <p>Advocate for pet-friendly policies in your locality</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-bittersweet">•</div>
                    <p>Document and share success stories</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-6 text-hunter-green">
                Volunteer Registration
              </h3>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="full-name"
                    className="block text-sm font-medium mb-2 text-hunter-green"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="full-name"
                    required
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-bittersweet focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-hunter-green"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-bittersweet focus:border-transparent"
                    placeholder="Your email address"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-2 text-hunter-green"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-bittersweet focus:border-transparent"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium mb-2 text-hunter-green"
                  >
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    required
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-bittersweet focus:border-transparent"
                    placeholder="Your city"
                  />
                </div>

                <div>
                  <label
                    htmlFor="role-preference"
                    className="block text-sm font-medium mb-2 text-hunter-green"
                  >
                    Role Preference *
                  </label>
                  <select
                    id="role-preference"
                    required
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-bittersweet focus:border-transparent"
                  >
                    <option value="">Select your preferred role</option>
                    <option value="community-outreach">
                      Community Outreach
                    </option>
                    <option value="event-organization">
                      Event Organization
                    </option>
                    <option value="animal-care">Animal Care</option>
                    <option value="advocacy">Advocacy & Policy</option>
                    <option value="content-creation">Content Creation</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="experience"
                    className="block text-sm font-medium mb-2 text-hunter-green"
                  >
                    Previous Experience
                  </label>
                  <textarea
                    id="experience"
                    rows={3}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-bittersweet focus:border-transparent"
                    placeholder="Tell us about any previous volunteer experience (if any)"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-3 bg-bittersweet text-white text-sm uppercase tracking-widest hover:bg-hunter-green transition-colors rounded-md"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-8 bg-hunter-green text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Office Locations */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4 border-b border-bittersweet pb-2">
                Our Hub
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-bittersweet">
                    Bhopal Office:
                  </p>
                  <p className="text-sm">
                    Third Floor, Above Bread &amp; Better, Near Shiyoy Complex,
                    Gulmohar, Bhopal, Madhya Pradesh 462039
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-bittersweet">
                    Mumbai Office:
                  </p>
                  <p className="text-sm">
                    74 Technopark, MIDC Gate no 2, Seepz, Andheri East, Mumbai,
                    Maharashtra 400069
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-bittersweet">
                    Delhi Office:
                  </p>
                  <p className="text-sm">
                    1112, Surya kiran building, Connaught Place, New Delhi,
                    110001
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-bittersweet">Pune Office:</p>
                  <p className="text-sm">
                    First Floor, Creaticity Mall, Opposite Golf Course,
                    Shastrinagar, Yerawada, Pune 411006
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-bittersweet">
                    Indore Office:
                  </p>
                  <p className="text-sm">
                    The One, RNT Marg, Indore, Madhya Pradesh 452001
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-bittersweet">
                    Upcoming Cities:
                  </p>
                  <p className="text-sm">
                    RAIPUR, JAIPUR, GWALIOR, AHEMEDABAD &amp; GOA
                    <br />
                    HUNGARY (International Hub)
                  </p>
                </div>
              </div>
            </div>

            {/* Organization Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4 border-b border-bittersweet pb-2">
                  CollegeTips.in
                </h3>
                <p className="text-sm mb-4">
                  a venture of CollegeTips Ed. Tech. Media Pvt. Ltd.
                </p>
              </div>

              {/* Social Media Icons */}
              <div>
                <h4 className="text-sm uppercase tracking-widest mb-3">
                  Connect With Us
                </h4>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/collegetips.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-bittersweet transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 320 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="currentColor"
                        d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com/CollegeTips_in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-bittersweet transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="currentColor"
                        d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/collegetips.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-bittersweet transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 448 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="currentColor"
                        d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCcbf5sZkxsBGYj9Dr7K9QEA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-bittersweet transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 576 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="currentColor"
                        d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4 border-b border-bittersweet pb-2">
                Get In Touch
              </h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-white/10 border-0 rounded p-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-bittersweet"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-white/10 border-0 rounded p-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-bittersweet"
                />
                <textarea
                  placeholder="Your Message"
                  rows={3}
                  className="w-full bg-white/10 border-0 rounded p-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-bittersweet"
                ></textarea>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-bittersweet text-white text-sm uppercase tracking-widest hover:bg-white hover:text-hunter-green transition-colors rounded"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-6 border-t border-white/20 text-center">
            <p className="text-sm">
              © 2025 Pet-Friendly City Initiative by CollegeTips.in. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Chat Box */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-full max-w-[calc(100vw-32px)] md:max-w-[400px]">
        {!isChatOpen ? (
          <button
            onClick={() => setIsChatOpen(true)}
            className="ml-auto w-12 h-12 md:w-16 md:h-16 rounded-full bg-bittersweet text-white flex items-center justify-center shadow-lg hover:bg-hunter-green transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-xl w-full"
            >
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-semibold text-hunter-green">
                  Chat with PawBuddy
                </h3>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-gray-500 hover:text-hunter-green transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {/* Rest of the chat interface */}
              <div className="flex-1 p-4 overflow-y-auto">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-4 flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.sender === "user"
                          ? "bg-bittersweet text-white rounded-br-none"
                          : "bg-gray-100 text-hunter-green rounded-bl-none"
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="border-t border-gray-200 p-4 flex">
                <input
                  type="text"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 border border-hunter-green rounded-l-lg px-3 py-2 focus:outline-none focus:ring-0 focus:border-bittersweet"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-bittersweet text-white px-4 rounded-r-lg hover:bg-hunter-green transition-colors"
                  aria-label="Send message"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </main>
  );
}
