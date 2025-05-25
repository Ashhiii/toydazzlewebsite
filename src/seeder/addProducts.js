import { supabase } from "../supabaseClient"; 
import { v4 as uuidv4 } from "uuid";

const products = [
  {
    image: "/images/products/boys/1.png",
    name: "Paw Patrol Rubble & Crew Wheeler’s Bark Yard Deluxe Dump Truck Vehicle",
    price: 1439,
    category: "Boys",
    description:
      "Ideal for ages 3 and up, this plastic dump truck features authentic details, moving parts, and working wheels. Kids can team up with Rubble for construction fun, recreating scenes from PAW Patrol or inventing their own adventures. Measuring 5.29 x 17 x 14 inches, it encourages fine motor skills and imaginative play. Collect all Rubble & Crew toys for endless fun. Color and packaging may vary.",
    stock: 521,
  },
  {
    image: "/images/products/boys/2.png",
    name: "Nerf Transformers EarthSpark Cyber-Sleeve Battle Blaster",
    price: 1529.1,
    category: "Boys",
    description:
      "Perfect for ages 6 and up, this plastic blaster features a retractable Cyber-Sword and dart launcher. Load 1 of the 3 included Nerf darts, pull the lever, and press the button to launch. Store the other 2 darts in side chambers for quick reloads. With adjustable straps for a comfortable fit, kids can join epic battles like Mo Malto. Great for costumes and interactive play. Color and packaging may vary.",
    stock: 151,
  },
  {
    image: "/images/products/boys/3.png",
    name: "Transformers Generations Legacy United Voyager Class Prime Universe Thundertron Action Figure",
    price: 2299,
    category: "Boys",
    description:
      "Ideal for ages 8 and up, this 7-inch action figure is inspired by Transformers: Prime. Thundertron converts from robot to Cybertronian lion in 24 steps and includes a versatile sword accessory. With articulated heads, arms, and legs, it offers dynamic posing. Part of the Legacy United series celebrating 40 years of Transformers history, this collectible is perfect for fans. Color and packaging may vary.",
    stock: 131,
  },
  {
    image: "/images/products/boys/4.png",
    name: "Transformers Generations Legacy United Voyager Class Animated Universe Optimus Prime Action Figure",
    price: 1529.1,
    category: "Boys",
    description:
      "Recommended for ages 8 and up, this 7-inch Optimus Prime figure draws inspiration from Transformers: Animated. It converts from robot to truck in 25 steps and includes an Ion Axe accessory with an extendable handle and an attachable lightbar piece. With articulated heads, arms, and legs for dynamic poses, it celebrates 40 years of Transformers history. A perfect collectible for fans. Color and packaging may vary.",
    stock: 221,
  },
  {
    image: "/images/products/boys/5.png",
    name: "Marvel Legends Series Iron Man Mark LXXXV Action Figures",
    price: 1034.1,
    category: "Boys",
    description:
      "Recommended for ages 4 and up, this 6-inch Iron Man action figure is inspired by Marvel's The Invincible Iron Man comics. Fully articulated with poseable head, arms, and legs, it includes 6 accessories such as alternate hands and blast FX. Perfect for Marvel Universe fans and collectors. Color and packaging may vary.",
    stock: 511,
  },
  {
    image: "/images/products/boys/6.png",
    name: "Marvel Avengers Legend Series Iron-Man Nano Gauntlet",
    price: 1299,
    category: "Boys",
    description:
      "Recommended for ages 14 and up, this premium 1:1 scale roleplay item features a right-handed design. The Iron Man Nano Gauntlet from Avengers Endgame includes glowing, detachable Infinity Stones with pulsating light effects and movie-inspired snap sound FX. With flexible articulated fingers and movie-accurate details, it’s perfect for display in your Marvel Legends collection. Includes gauntlet, 6 Infinity Stones, and instructions. Requires 3 AA batteries (not included). Color and packaging may vary.",
    stock: 323,
  },
  {
    image: "/images/products/boys/7.png",
    name: "Marvel Black Panther Legacy Collection Vibranium Power FX Mask",
    price: 512.1,
    category: "Boys",
    description:
      "Recommended for ages 5 and up, this Black Panther mask features Vibranium-powered technology with pulsating and fixed electronic light effects. Inspired by Marvel's Black Panther movie, it has a slide control for flipping the lenses up or down. Perfect for roleplay, it captures the iconic design from the Marvel Cinematic Universe. Requires 1 AA battery (not included). Color and packaging may vary.",
    stock: 511,
  },
  {
    image: "/images/products/boys/8.png",
    name: "Teamsterz Street Machines Garbage & Dump Truck 2 Packs Die-cast",
    price: 151,
    category: "Boys",
    description:
      "Recommended for ages 3 and up, this set features high-quality die-cast metal garbage and dump trucks. Each vehicle includes an independent free-moving wheels, a detailed underbody, and a durable body shell. Available in assorted styles and colors, they're a great addition to any car collection. Color and packaging may vary.",
    stock: 332,
  },
  {
    image: "/images/products/boys/9.png",
    name: "Teamsterz Beast Machines Crocodile Green Die-cast",
    price: 71,
    category: "Boys",
    description:
      "Recommended for ages 3 and up, this die-cast vehicle features a high-quality metal body shell, independent free-moving wheels, and molded underbody detailing. Available in assorted styles and colors, these durable cars are a great addition to any collection. Color and packaging may vary.",
    stock: 112,
  },
  {
    image: "/images/products/boys/10.png",
    name: "Orange Power Popper Gatling Machine Gun",
    price: 1299,
    category: "Boys",
    description:
      "Recommended for ages 6 and up, this plastic Gatling machine gun comes with 24 foam balls for endless fun. With dimensions of 29x24x37cm, it can hold up to 1.11kg. Color and design may vary, ensuring each experience is unique.",
    stock: 623,
  },
  {
    image: "/images/products/boys/11.png",
    name: "Zing Klixx Creaturez Shark Blue Action Figure",
    price: 359,
    category: "Boys",
    description:
      "Recommended for ages 4 and up, this plastic shark action figure is perfect for endless fun and stress relief. Each brightly colored Sea Creaturez figure has a flexible body that bends, twists, and clicks. Use multiple joints and links to create stop-motion animations with the Zing Studio app. Great for STEM education and creative play. Color and packaging may vary.",
    stock: 231,
  },
  {
    image: "/images/products/boys/12.png",
    name: "Zing Klixx Creaturez Cobra Purple Action Figure",
    price: 359,
    category: "Boys",
    description:
      "Recommended for ages 4 and up, this plastic cobra action figure is part of the Klixx Creaturez series. With 6 variations and 2 color options each, including spiders, scorpions, fire ants, pythons, cobras, and rattlesnakes, you have endless artistic possibilities. These brightly colored, 24-inch long snakes and uniquely shaped insects are perfect for creative play. Use the Zing Studio app to create stop-motion animations. Great for education and imaginative play. Color and packaging may vary.",
    stock: 200,
  },
  {
    image: "/images/best-sellers/bs1.png",
    name: "Intex Mandarin Swim Center Inflatable Family Pool",
    category: "Boys",
    price: 1600,
    description:
      "This inflatable pool is perfect for bringing cool summer fun right to your backyard. The bright orange design adds a pop of color to your outdoor space, while the rectangular shape offers plenty of room for splishing and splashing.",
    stock: 100,
    tag: ["Best Seller"],
  },
  {
    image: "/images/best-sellers/bs2.png",
    name: "Dream Machine Dark Blue and White 2 Nozzle Water Blaster",
    category: "Boys",
    price: 399,
    description:
      "Perfect for ages 1 and up, this durable and lightweight 4-wheeled ride-on toy features a sturdy plastic frame, steel wheel axle, and a safety steering limiter. Stylish, bright, and ready to ride out of the box. Measures L19 x W7 x H14 inches.",
    stock: 300,
    tag: ["Best Seller"],
  },
  {
    image: "/images/best-sellers/bs3.png",
    name: "Jungle Adventure Inflatable Kid Play Center Pool",
    category: "Boys",
    price: 5499,
    description:
      "The Intex jungle adventure game center takes you to a river in the center of the jungle with animals, palm trees and more! The inflatable is divided into 2 swimming pools, one small and one larger, which are connected to each other via a padded-based slide. In the small pool part, the play center has a sprinkler with garden hose socket.",
    stock: 250,
    tag: ["Best Seller"],
  },
  {
    image: "/images/best-sellers/bs4.png",
    name: "Red Scooter Inflatable Pool Ride-On",
    price: 300,
    category: "Boys",
    description:
      "Ideal for ages 6 to 12, the Jilong Red Scooter Pool Ride-On measures 36 x 20 inches and features 2 air chambers for extra safety. Made from durable vinyl, it ensures lasting fun in the pool.",
    stock: 150,
    tag: ["Best Seller"],
  },
  {
    image: "/images/new-arrivals/na1.png",
    name: "Kinetic Sand Rainbow Unicorn Castle Squeezable Sand",
    price: 249.75,
    description:
      "Perfect for ages 3 and up, this squeezable sand doesn't stain, dry out, or dissolve in water. It's safe, hypoallergenic, and prevents bacterial growth. Mix to create new colors and scents. Color and packaging may vary.",
    stock: 150,
    category: "Boys",
    tag: ["New Arrivals"],
  },
  {
    image: "/images/new-arrivals/na2.png",
    name: "Chillafish ItsiBitsi Blocks 4-Wheel First Ride-On Training Bike",
    category: "Boys",
    price: 1199,
    description:
      "Ideal for ages 1 and up, this durable 4-wheeled ride-on features a strong plastic frame, steel wheel axle, and safety steering limiter. Lightweight, stylish, and bright, it comes fully assembled and measures L19 x W7 x H14 inches. Perfect for your child's first ride-on!",
    stock: 150,
    tag: ["New Arrivals"],
  },
  {
    image: "/images/new-arrivals/na3.png",
    name: "Transformers Rise Of The Beasts Rhinox Action Figure",
    category: "Boys",
    price: 1699,
    description:
      "Recommended for ages 8 and up, this pre-painted and pre-assembled figure from Yolopark's AMK series is easy to put together. Once constructed, it stands just under 8 inches tall with premium articulation, showcasing Rhinox from the upcoming Transformers: Rise of the Beasts movie. Color and packaging may vary.",
    stock: 150,
    tag: ["New Arrivals"],
  },
  {
    image: "/images/new-arrivals/na4.png",
    name: "Globber Master Teal 3-Wheel Electronic Scooter",
    category: "Boys",
    price: 23499.75,
    description:
      "Recommended for ages 4 and up, this scooter features ergonomic dual-color grips, a wide anti-slip deck, and supports up to 50kg. It has a 5-height adjustable aluminum T-bar, a patented folding system, and a steering lock button for safe riding. Made of durable metal for lasting fun.",
    stock: 150,
    tag: ["New Arrivals"],
  },
  {
    image: "/images/products/girls/21.png",
    name: "Barbie Made To Move Blue Doll",
    price: 999,
    category: "Girls",
    description:
      "Recommended for ages 3 and up, this blue Barbie doll is designed to inspire movement and self-care. With extreme flexibility, kids can play out various movements and stillness, promoting imaginative play. Perfect for Barbiecore style play and inspiring stories, this doll encourages kids to be good to themselves. Color and packaging may vary.",
    stock: 521,
  },
  {
    image: "/images/products/girls/22.png",
    name: "Disney Frozen Magical Skirt Anna Fashion Doll",
    price: 199,
    category: "Girls",
    description:
      "Recommended for ages 3 and up, this Anna doll is inspired by Disney's Frozen. She wears her signature look with a soft color-change skirt, removable cape, and boots. Using the snowflake wand and icy water, kids can activate the color magic, changing Anna's skirt to a dramatic blue with a snowflake pattern. Warm water changes it back for repeated fun. Anna's signature braids allow for brushing and styling. Collect all Disney Frozen dolls for endless adventures! Each sold separately. Measures approximately 5.24 x 2.13 x 12.74 inches. Color and packaging may vary.",
    stock: 521,
  },
  {
    image: "/images/products/girls/23.png",
    name: "Disney Princess Ariel Doll",
    price: 1199,
    category: "Girls",
    description:
      "Recommended for ages 3 and up, this Disney Princess doll is inspired by the beloved character from The Little Mermaid. Ariel is ready to find her dream in her signature fashion from the movie, complete with removable shoes and tiara. With long hair for styling and brushing, kids can create endless looks. Collect all Disney Princess ballerina dolls for the ultimate dance party! Each sold separately. Measures approximately 4.21 x 1.88 x 12.71 inches.",
    stock: 521,
  },
  {
    image: "/images/products/girls/24.png",
    name: "Dilly Dolly Sweet Tootsie Blue/Pink Dress Doll",
    price: 600,
    category: "Girls",
    description:
      "Recommended for ages 3 and up, this plastic doll provides interactive playtime fun. It comes with 3 x AG13 batteries included. With Dilly Dolly Baby Dolly in a white shirt and pink pajamas, kids can develop social skills and enjoy 12 different baby sounds. The doll features built-in touch sensors for interaction, a drink and pee function for realistic play, and blinking eyes for added realism. Perfect for hours of imaginative play, offering a break from video games.",
    stock: 521,
  },
  {
    image: "/images/products/girls/25.png",
    name: "Squishmallows Wanda 12 inch Plush",
    price: 674,
    category: "Girls",
    description:
      "Recommended for ages 3 and up, this plush Squishmallows Wanda is perfect for cuddles and play. Made from ultrasoft polyester fabric, it's super soft and high-quality. Grow your Squishmallows Squad with this collectible stuffed animal available in various personalities, sizes, and colors. Explore other Squishmallows extensions like FlipAMallows, HugMees, Mystery Squad, and Stackables for even more fun. Color and design may vary.",
    stock: 521,
  },
  {
    image: "/images/products/girls/26.png",
    name: "Squishmallows Woxie 12 inch Plush",
    price: 674,
    category: "Girls",
    description:
      "Recommended for ages 3 and up, this plush Squishmallows Woxie is perfect for cuddles and play. Made from ultrasoft polyester fabric, it's super soft and high-quality. Grow your Squishmallows Squad with this collectible stuffed animal available in various personalities, sizes, and colors. Explore other Squishmallows extensions like FlipAMallows, HugMees, Mystery Squad, and Stackables for even more fun. Color and design may vary.",
    stock: 521,
  },
  {
    image: "/images/products/girls/27.png",
    name: "Gabby's Dollhouse Gabby's Party Room Playset",
    price: 2599,
    category: "Girls",
    description:
      "Recommended for ages 3 and up, Gabby’s Party Room features a skate ramp, stage, and skating rink, along with cute accessories like a claw machine. It includes Skater Gabby & Marty the Party Cat figures with working skates. Attach the Party Room to the attic of both versions of the dollhouse for non-stop celebrations! Unbox a Dollhouse Deliveries mystery accessory to add to the fun. With themed rooms, furniture, figures, and playsets, kids can develop their imagination through pretend play. Measures approximately 5.25 x 16 x 8 inches. Color and packaging may vary.",
    stock: 521,
  },
  {
    image: "/images/products/girls/28.png",
    name: "Gabby's Dollhouse Pillow Cat's Sweet Dreams Bedroom Playset",
    price: 1199,
    category: "Girls",
    description:
      "Recommended for ages 3 and up, this playset features transforming furniture pieces for imaginative play. Discover features like a bubbling bathtub, spinning cake, and a bed’s bookshelf that turns into a colorful dreamscape. Includes 2 dollhouse deliveries and 2 surprise accessories to enhance storytelling. Compatible with Gabby’s Dollhouse and other Deluxe Rooms (sold separately). Inside one of the deliveries, find a QR code to unlock an exclusive reward in the Gabby’s Dollhouse App. Color and packaging may vary.",
    stock: 521,
  },
  {
    image: "/images/products/girls/29.png",
    name: "Hatchimals Alive Rainbow Hatchery - Amazing Color Swirl Mini Figures",
    price: 2199,
    category: "Girls",
    description:
      "Recommended for ages 3 and up, experience Rainbow Hatchery’s amazing reveal! Remove the wings from each egg and fill the heart with water to watch the water change color, swirling into a rainbow effect as each character begins hatching. With love and care, magically bring 6 Rainbow Splash characters to life. The surprise eggs hatch in water, revealing 1 of 6 rainbow hues to match each character. Attach the wings and use doll accessories for pretend play storytelling. Discover molded play areas inside the Rainbow Hatchery nest, including a highchair, slide, and more. Measures approximately 3.18 x 8.75 x 9 inches. Color and packaging may vary.",
    stock: 521,
  },
  {
    image: "/images/products/girls/30.png",
    name: "Head Start Hairdooz Frooty Scented Candy Doll",
    price: 449,
    category: "Girls",
    description:
      "Recommended for ages 3 and up, Hairdooz dolls have hair that changes color when immersed in warm water. Overturn the shampoo bottle to find the doll sitting on the hairdresser’s seat. This product is an assortment, you will receive any 1 doll from the series. Collect all 24 figures. Each Hairdooz bottle capsule contains 1 Hairdoo, 1 Bottle Capsule, 1 Styling Chair, 1 Suction Cup, 1 Hairdresser's Cape, and 1 Collector's Guide. Color and packaging may vary.",
    stock: 521,
  },
  {
    image: "/images/products/girls/31.png",
    name: "Barbie Stacie's Puppy Playground Playset",
    price: 2499,
    category: "Girls",
    description:
      "Recommended for ages 3 and up, kids can play out all their puppy energy with Stacie doll and this Puppy Obstacle Course playset! This customizable playground features a spinning tower, ladder, and slide. The cones connect to the hoops and training sticks for puppy jumps, leaps, and balancing stunts! Accessories like puppy toys, treats, a trophy, pet bed, puppy comb, and bowl encourage storytelling play. Stacie doll is wearing her training outfit, just like her look in the movie Barbie and Stacie to the Rescue! This 20+ piece playset measures approximately 13.97 x 2.63 x 12.71 inches. Color and packaging may vary.",
    stock: 521,
  },
  {
    image: "/images/products/girls/32.png",
    name: "KidShop My Glamorous Vanity Playset",
    price: 584,
    category: "Girls",
    description:
      "Recommended for ages 3 and up, this amazing fashion beauty salon lets little ones become hairdressers, stylists, or even princesses! Playing pretend makeup games can develop parent-child communication and inspire kids' potential. This playset includes a durable trolley suitcase, hairpin, comb, lipstick, perfume, hair dryer, mirrors, stickers, blush, nail polish, and more. Requires 2 x 1.5V “AA” Batteries (Not Included). Color and packaging may vary.",
    stock: 521,
  },
  {
    image: "/images/products/baby/41.png",
    name: "Fisher-Price Laugh & Learn Smart Stages Tablet Grey",
    price: 1499,
    category: "Baby",
    description:
      "Recommended for ages 1 year and up, this interactive pretend tablet computer toy features multi-color lights, music, sounds, and phrases. Switch up the learning play as the baby grows with 3 Smart Stages levels. 28 'app' buttons activate lights, music, and learning phrases. With over 100 songs, sounds, and phrases, it teaches letters of the alphabet, colors, first words, and more in French. Measures approximately 7.48 x 0.98 x 5.31 inches. Requires 3 x AAA batteries (Not included). Color and packaging may vary.",
    stock: 521,
  },
  {
    image: "/images/products/baby/42.png",
    name: "Fisher-Price Smart Stages Laugh & Learn Puppy",
    price: 2799,
    category: "Baby",
    description:
      "Recommended for ages 6 months and up, this interactive puppy introduces over 100 first words, colors, shapes, and more! With three Smart Stages learning levels, it grows with your child. Press Puppy's hands, foot, heart, nose, or ear to explore, encourage counting and color recognition, and engage in imaginative play. Features light-up multicolor heart. Requires 3 x AAA batteries (included). Measures approximately 11 x 6 x 13 inches. Color and packaging may vary.",
    stock: 521,
  },
  {
    image: "/images/products/baby/43.png",
    name: "Fisher-Price Laugh & Learn Storybook Rhymes",
    price: 1439,
    category: "Baby",
    description:
      "Recommended for ages 6 months and up, this interactive storybook features familiar Laugh and Learn characters. It teaches counting, first words, letters, numbers, shapes, and more. With light-up buttons for letters, numbers, and shapes, and easy-to-turn pages to develop fine motor skills. The top handle makes it easy to take along. Packaging measures approximately L9 x W2 x H11 inches.",
    stock: 521,
  },
  {
    image: "/images/products/baby/44.png",
    name: "Fisher-Price Learn With Me Zebra Walker",
    price: 2499,
    category: "Baby",
    description:
      "Recommended for ages 6 months and up, this musical infant walking toy grows with your baby with two play modes: Sit & play and Stand and walk. Features hands-on activities, light-up buttons, and sing-along songs teaching letters and numbers. Easy-grasp handle and sturdy 4-wheel base help steady baby's first steps. Measures approximately 26.88 x 3.5 x 16 inches. Requires 2 x AA batteries (Not included). Color and packaging may vary.",
    stock: 521,
  },
  {
    image: "/images/products/baby/45.png",
    name: "Fisher-Price Infant Game Time Activity Board",
    price: 2499,
    category: "Baby",
    description:
      "Recommended for ages 9 months and up, this interactive board game toy features 3 play points activating lights, music, and learning songs. With 3 Smart Stages levels, it teaches numbers, alphabet, and shapes with 40+ songs and phrases. Includes 3 shape game pieces for sorting fun. Offers 10 busy activities to strengthen fine motor skills. Measures approximately 12.75 x 2.37 x 13 inches. Requires 3 AA batteries (Not included). Color and packaging may vary.",
    stock: 521,
  },
  {
    image: "/images/products/baby/46.png",
    name: "Fisher Price Laugh & Learn Twist & Learn Gamer Playset",
    price: 1599,
    category: "Baby",
    description:
      "Recommended for ages 9 months and up, this pretend gaming console features lights, music, and Laugh & Learn pals for early role play. Toddlers control the fun with 10+ buttons for lights, music, and sounds. Includes 65+ songs teaching counting, shapes, and colors. Realistic design allows joystick movement and button pressing. Helps develop fine motor skills. Requires 3 AAA batteries (not included). Measures approximately 8.97 x 1.96 x 5.98 inches. Color and packaging may vary.",
    stock: 521,
  },
  {
    image: "/images/products/baby/47.png",
    name: "Fisher-Price Laugh & Learn Counting & Colors Smoothie Maker",
    price: 1499,
    category: "Baby",
    description:
      "Recommended for ages 9 months and up, this interactive blender toy features lights, music, and hands-on play. Press buttons for lights and 25+ songs teaching colors and counting. Includes 5 fruit & veggie play pieces. Lid opens for put-and-take play. Helps develop fine motor skills. Requires 3 AA batteries (Not included). Measures approximately 5.98 x 4.21 x 9.5 inches. Color and packaging may vary.",
    stock: 521,
  },
  {
    image: "/images/products/baby/48.png",
    name: "Fisher-Price Glow And Grow Kick & Play Piano Gym",
    price: 3499,
    category: "Baby",
    description:
      "For ages 0 months and up, this baby gym offers 4 ways to play as baby grows, with music, lights & learning. Features Smart Stages® learning levels with 85+ songs teaching animals, colors, numbers, and shapes. Includes removable light-up piano and 10 repositionable toys. Soft, machine-washable playmat with loops for toy attachment. Measures approximately 20.47 x 3.24 x 17.5 inches. Requires 3 AA batteries (Not included). Color and packaging may vary.",
    stock: 521,
  },
  {
    image: "/images/products/baby/49.png",
    name: "Fisher-Price Infant Shapes & Sounds Vehicle Puzzle",
    price: 1499,
    category: "Baby",
    description:
      "Recommended for ages 9 months and up, this 2-in-1 puzzle and shape sorter features 40 songs & sounds with lights for hands-on fun. Includes 4 vehicle puzzle pieces & 4 animal-themed sorting pieces to introduce shape recognition. Activates vehicle & animal sounds, plus lights when pieces are placed in the base. Press sun button for additional engaging music play. Helps develop fine motor skills and problem-solving. Measures approximately 10.98 x 1.73 x 10.98 inches. Requires 2 AAA batteries (Not included). Color and packaging may vary.",
    stock: 521,
  },
  {
    image: "/images/products/baby/50.png",
    name: "VTech Baby Pink Sort and Learn Car",
    price: 1799,
    category: "Baby",
    description:
      "Recommended for ages 12 months and up, this musical shape sorting car features 1 sing-along song and 5 melodies. Open the boot to release shapes, and push pieces through windows to hear cheerful tunes and learn shape names. Press piano keys to learn colors and musical notes. Pull-along cord tucks safely away. Requires 2 x AA batteries (demo batteries included).",
    stock: 521,
  },
  {
    image: "/images/products/baby/51.png",
    name: "VTech Sort and Discover Drum",
    price: 1799,
    category: "Baby",
    description:
      "Recommended for ages 12 months and up, this plastic drum measures approximately L 19 x W 12 x H 19 cm. Features light and sound with 50+ songs, melodies, sounds, and phrases. Requires 2 x AAA batteries (included). Includes volume control, durable design, and auto-shut off.",
    stock: 521,
  },
  {
    image: "/images/products/baby/52.png",
    name: "VTech Baby Bear Laptop",
    price: 1499,
    category: "Baby",
    description:
      "Recommended for ages 6 to 36 months old, this interactive laptop helps kids learn shapes, numbers, and sing-along songs. Features three buttons for learning, two light-up buttons for songs, and a roller ball for melodies and sounds. Portable with an easy carry handle, movable mouse, and peek-a-boo action. Product dimensions: 9 x 6.25 x 1.25. Requires 2 x AAA batteries.",
    stock: 521,
  },
  {
    image: "/images/products/learning/53.png",
    name: "Picasso Tiles 52pcs Farm Animal Set With 8 Action Figures",
    price: 2610,
    category: "Learning",
    description:
      "Recommended for ages 3 years and up, this set features plastic farm animals including a rabbit, duck, parrot, frog, unicorn, cat, cow, and dog. Encourages storytelling and imaginative play with versatile magnetic pieces compatible with other PicassoTiles sets. Create farm life adventures and structures while fostering creativity. Color and packaging may vary.",
    stock: 521,
  },
  {
    image: "/images/products/learning/54.png",
    name: "Picasso Tiles 52pcs Marine Animal Set With 8 Action Figures",
    price: 2610,
    category: "Learning",
    description:
      "Recommended for ages 3 years and up, this set features plastic marine animals including an Orca, Shark, Dolphin, Jellyfish, Sea Turtle, Crab, Octopus, and Fish. Encourages creative storytelling and imaginative play with 44 magnet tile pieces and 8 marine animal figures. Compatible with other PicassoTiles sets for versatile playtime adventures. Stimulates STEAM education, enhancing fine motor skills and cognitive abilities. Color and packaging may vary.",
    stock: 521,
  },
  {
    image: "/images/products/learning/55.png",
    name: "Picasso Tiles 45pcs Construction Set With 8 Vehicles",
    price: 1710,
    category: "Learning",
    description:
      "Recommended for ages 3 years and up, this set includes plastic construction vehicles like Crank Truck, Excavator, Bulldozer, and more. Contains 45 magnet tile pieces for creative construction play. Compatible with other magnet building tile sets for expanded storytelling adventures. Snap-together pieces encourage imaginative play and fine motor skills development. Color and packaging may vary.",
    stock: 521,
  },
  {
    image: "/images/products/learning/56.png",
    name: "KidShop Yellow 125pcs Blocks",
    price: 180,
    category: "Learning",
    description:
      "Recommended for ages 3 years and up, this set includes 125 plastic building blocks in various colors and shapes. Helps kids understand shapes and colors while exercising finger dexterity. Comes in a zippered packet with a handle for convenient storage and transport. Ideal for educational and fun playtime. Color and packaging may vary.",
    stock: 521,
  },
  {
    image: "/images/products/learning/57.png",
    name: "KidShop Blocks 'n Crafts 76 pcs Building Blocks",
    price: 521,
    category: "Learning",
    description:
      "Recommended for ages 3 years and up, this set of plastic building blocks features various colors and shapes, aiding in shape and color recognition and improving finger dexterity. The set offers educational yet fun playtime. Comes in a zippered packet with a handle for convenient storage and transport. No batteries required.",
    stock: 521,
  },
  {
    image: "/images/products/learning/58.png",
    name: "KidShop Blocks 'n Crafts 168 pcs Building Blocks",
    price: 675,
    category: "Learning",
    description:
      "Recommended for ages 6 years and up, this set includes 168 plastic building blocks in various colors. It helps children understand shapes, enhances finger dexterity, and fosters creativity. With unlimited combinations, it offers endless building possibilities. No batteries required. Packaging may vary.",
    stock: 521,
  },
  {
    image: "/images/products/learning/59.png",
    name: "KidShop Blocks 'n Craft 46 pcs Building Blocks",
    price: 341,
    category: "Learning",
    description:
      "Recommended for ages 3 years and up, this set includes 46 plastic building blocks in various colors and shapes. It helps children understand shapes, enhances finger dexterity, and encourages creativity. The colorful blocks make playtime educational and fun. Packaged in a zippered packet with a handle for convenient storage and transport. No batteries required. Packaging may vary.",
    stock: 521,
  },
  {
    image: "/images/products/learning/60.png",
    name: "KidShop 100 pcs Building Blocks",
    price: 170,
    category: "Learning",
    description:
      "Recommended for ages 3 years and up, this set includes plastic building blocks featuring a variety of colors and shapes. Designed to make playtime educational and fun, it encourages creativity and fine motor skills development. The blocks come in a zippered packet with a handle for convenient storage and transportation. No batteries required.",
    stock: 521,
  },
  {
    image: "/images/products/learning/61.png",
    name: "Lego 42617 Friends Farm Animal Sanctuary 489pcs Building Blocks",
    price: 4299,
    category: "Learning",
    description:
      "Recommended for ages 6+. Creative play with 489 pieces. Includes farm building, tractor, windmill, and 3 figures. Features animals, vegetable harvesting, and jelly-making. Interactive windmill transforms jars. Accessories included. LEGO Builder app for building guidance.",
    stock: 521,
  },
  {
    image: "/images/products/learning/62.png",
    name: "Lego 42612 Friends Cat Playground Adventure 87pcs Building Blocks",
    price: 550,
    category: "Learning",
    description:
      "Recommended for ages 5+. Includes 87 pieces for building a cat playground. Features 2 mini-dolls, 2 animal characters, and pet care accessories. Encourages imaginative play. Interactive features like a slide and a lever-operated litter box. LEGO Builder app for building guidance.",
    stock: 521,
  },
  {
    image: "/images/products/learning/63.png",
    name: "Lego 42601 Friends Hamster Playground 167pcs Building Blocks",
    price: 1499,
    category: "Learning",
    description:
      "Recommended for ages 6+. Includes 167 pieces for building a hamster playground. Features LEGO Friends characters Zac and Jamila, plus 3 hamster figures. Interactive elements include a merry-go-round, slide, and exercise wheel. Encourages imaginative play and social development. LEGO Builder app available for building guidance.",
    stock: 521,
  },
  {
    image: "/images/products/learning/64.png",
    name: "Lego 42615 Friends Pet Adoption Day 400pcs Building Blocks",
    price: 3499,
    category: "Learning",
    description:
      "Recommended for ages 6+. Contains 400 pieces for building a pet adoption scene. Features 4 mini-dolls, 2 micro-dolls, 5 pet figures, and accessories. Encourages role play and caring for animals. Includes a picnic area and pet shop. LEGO Builder app available for building assistance.",
    stock: 521,
  },
  {
    image: "/images/products/riding/65.png",
    name: "Teal Rocking Animal Ride-On",
    price: 1499,
    category: "Riding",
    description:
      "Recommended for ages 1+. Made of durable plastic. Provides hours of fun for kids. Features footrest for comfort. Adult supervision required. Measures approximately 76cm x 33cm x 48cm.",
    stock: 521,
  },
  {
    image: "/images/products/riding/66.png",
    name: "Red Rocking Horse Ride-On",
    price: 1499,
    category: "Riding",
    description:
      "Recommended for ages 3 and up. Made of durable plastic. Encourages imaginative play. Allows rocking motion for fun playtime.",
    stock: 521,
  },
  {
    image: "/images/products/riding/67.png",
    name: "Croko Rider Kiddie Ride-On",
    price: 799,
    category: "Riding",
    description:
      "For ages 3 years and up, this outdoor ride lets kids have fun riding cool Croko cars.",
    stock: 521,
  },
  {
    image: "/images/products/riding/68.png",
    name: "Jeep Pink/Blue Ride-On",
    price: 4699,
    category: "Riding",
    description:
      "Ideal for ages 1 to 6 years, this ride-on features a sturdy plastic and metal construction. It comes with one ride-on vehicle, perfect for outdoor play. Measures approximately L39 x W16.5 x H33.5 inches when assembled, with a maximum weight capacity of 30 kg.",
    stock: 521,
  },
  {
    image: "/images/products/riding/69.png",
    name: "JD Bug Pink Kick Scooter",
    price: 2699,
    category: "Riding",
    description:
      "Perfect for kids under 4 years, this pink kick scooter features a durable metal construction. With 5 front wheels and 4 rear wheels, it offers stability and safety. The ultralight alloy construction and durable steel fork ensure a smooth ride. Equipped with ABEC 5 bearings. Maximum weight capacity: 20 kgs / 44 lbs.",
    stock: 521,
  },
  {
    image: "/images/products/riding/70.png",
    name: "JD Bug Blue Kick Scooter",
    price: 2699,
    category: "Riding",
    description:
      "Designed for kids under 4 years, this blue kick scooter is made of durable metal. It features 5 front wheels and 4 rear wheels for stability. Constructed with ultralight alloy and a durable steel fork, ensuring a safe and smooth ride. Equipped with ABEC 5 bearings. Maximum weight capacity: 20 kgs / 44 lbs. A cool gift idea for kids!",
    stock: 521,
  },
  {
    image: "/images/products/riding/71.png",
    name: "Chien Ti White Rapid Ride-On Car",
    price: 8400,
    category: "Riding",
    description:
      "Perfect for ages 3 to 6, this ride-on car comes with a 6-volt battery and has a weight capacity of 77lbs. Measures 37” x 21” x 17”. Features a 2.4 GHz remote control for added convenience. Remote control requires 2 AAA batteries (not included).",
    stock: 521,
  },
  {
    image: "/images/products/riding/72.png",
    name: "Deck Genesis Blue 16 inch Bike",
    price: 3900,
    category: "Riding",
    description:
      "Ideal for ages 3 to 8 years, this bike features a sturdy steel construction with a cool design. Equipped with a chain guard and training wheels for added safety. Measures approximately: L=93cm x W=17cm x H=44cm. Perfect gift for boys.",
    stock: 521,
  },
  {
    image: "/images/products/riding/73.png",
    name: "Disney Princess 12 inch Bike",
    price: 3999,
    category: "Riding",
    description:
      "Recommended for ages 2 years and up, this bike features plastic parts with a Disney Princess theme. Perfect for little girls who love their Princesses! Equipped with a coaster brake for smooth stopping and wide training wheels for stability. Measures approximately 27.16 in x 6.69 in x 14.56in. Color and Design may vary.",
    stock: 521,
  },
  {
    image: "/images/products/riding/74.png",
    name: "2022 Jr Motorsport Led Light WHL Blue Motorcycle Ride-On",
    price: 10999,
    category: "Riding",
    description:
      "Recommended for ages 3 years and up, this ride-on motorcycle features LED light wheels and display for added flair. Made of durable plastic parts, it comes with a motor power of 380W and a 6V 7aH battery. Equipped with hand speed control, key start, and USB/AUX jack for music. Product Size: 9745.368.1 cm; G/N Weight: 11/13.6 kg.",
    stock: 521,
  },
  {
    image: "/images/products/riding/75.png",
    name: "Disney Frozen Twist Car",
    price: 1099,
    category: "Riding",
    description:
      "Recommended for ages 3 years and up, this Twist Car offers smooth and quiet riding for toddlers and young children. No gears, batteries, or pedals required—just twist, wiggle, and go! Suitable for both indoor and outdoor use, it encourages active play. Made from high-quality plastic, it's safety-tested and can hold up to 50 kilos of weight. Measures approximately 31.88 in x 9.05 in x 16.33 in. Color and design may vary.",
    stock: 521,
  },
  {
    image: "/images/products/riding/76.png",
    name: "Chillafish ItsiBitsi Blocks 4-Wheel First Ride-On Blue and Yellow Balance Training Bike",
    price: 1079,
    category: "Riding",
    description:
      "Recommended for ages 1 year and up, this blue and yellow balance training bike is perfect for toddlers. Made from durable plastic with a steel wheel axle, it's sustainable and safe, featuring a steering angle limiter to prevent overturning. Lightweight and easy to carry, it comes fully assembled and ready to ride. Measures approximately L19 x W7 x H14 inches.",
    stock: 521,
  },
];

const uploadImageToStorage = async (file, fileName) => {
  const { data, error } = await supabase.storage
    .from("product-images")
    .upload(fileName, file);

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("product-images")
    .getPublicUrl(fileName);

  return urlData.publicUrl;
};

const addProductsToSupabase = async () => {
  for (let product of products) {
    try {
      const id = uuidv4();
      const fileName = `${Date.now()}-${id}.png`;

      const imageFile = product.file; 
      const imageUrl = await uploadImageToStorage(imageFile, fileName);

      await supabase.from("products").insert([
        {
          id,
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          category: product.category,
          image: imageUrl, // 👈 Save image URL here
          created_at: new Date().toISOString(),
        },
      ]);

      console.log(`✅ Inserted: ${product.name}`);
    } catch (e) {
      console.error("❌ Error:", e.message);
    }
  }

  console.log("🎉 Done");
};

addProductsToSupabase();