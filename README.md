Website for Axiom, the philosophy society.

Built with React for main site UI design, ReactBits for components, and Eleventy for the newsletter blog.

Run locally using the `run.ps1` file.

Pull requests welcome. Encouraged, actually.

# future ideas/todos
replace the background with some iconic image of NSUT (and add dynamic dither effect on top of that)?

slow down the current dither effect and add more pixels for a more calming effect

ask claude to rewrite claude.md and deployment.md

try this dithering pattern
https://r3f.maximeheckel.com/dithered-waves

image trail is composed of pictures of philosophers
```
<div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
  <ImageTrail
    variant="1"
  />
</div>
```