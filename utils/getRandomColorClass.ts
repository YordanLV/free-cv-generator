export default function getRandomColorClass() {
    // Define an array of Tailwind color classes
    const colorClasses = [
      "bg-red-500",
      "bg-yellow-500",
      "bg-green-500",
      "bg-blue-500",
      "bg-indigo-500",
      "bg-purple-500",
      "bg-pink-500"
    ];
  
    // Get a random index from the colorClasses array
    const randomIndex = Math.floor(Math.random() * colorClasses.length);
  
    // Return the random color class
    return colorClasses[randomIndex];
  }