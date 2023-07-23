# GitHub Repository Commits | API

GitHub Repository Commits takes advantage of the axios library to interact with the GitHub API. It fetches data related to repositories and users and showcases them in an appealing visual format.

The program uses tailwindcss to achieve a beautiful and responsive design, ensuring a seamless user experience across different devices and screen sizes.

Additionally, flowbite comes into play by providing skeleton components and icons, enhancing the overall visual presentation and making the user interface more engaging.

With the combination of these powerful tools, GitHub Repository Commits delivers a delightful experience for users, making it easy to explore and understand repository commits and related information.

Make sure to include the required libraries and frameworks using their respective CDN links to fully utilize the features and design elements of GitHub Repository Commits. Happy coding!

If you have any questions create a issue <3

## Preview

<div id="slideshow">
  <figure>
    <img src="./src/Screenshot 2023-07-23 174838.jpg" alt="Slide 1">
    <figcaption>Slide 1</figcaption>
  </figure>
  <figure>
    <img src="./src/Screenshot 2023-07-23 174929.jpg" alt="Slide 2">
    <figcaption>Slide 2</figcaption>
  </figure>
</div>

---

## Requirments

- `axios` - fetch the user data
- `tailwindcss` - design
- `flowbite` - skeleton and icons

## Source

- [Axios - CDN](https://axios-http.com/de/)
- [TailwindCSS - CDN](https://tailwindcss.com/docs/installation/play-cdn)
- [Flowbite - CDN](https://flowbite.com/docs/components/skeleton/)


---
<style>
  #slideshow {
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    scrollbar-width: none; /* Hide scrollbar for a cleaner look */
  }

  #slideshow::-webkit-scrollbar {
    display: none; /* Hide scrollbar for a cleaner look in webkit browsers */
  }

  figure {
    margin: 0;
    flex: 0 0 auto;
    padding: 0 5px;
  }

  figcaption {
    text-align: center;
    margin-top: 5px;
    font-style: italic;
  }
</style>