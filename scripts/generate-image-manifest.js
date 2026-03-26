import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const dataDir = path.join(root, 'data')
const outputDir = path.join(root, 'react-app', 'src', 'data')

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.heic', '.HEIC', '.webp', '.gif']

function generateManifest() {
  const manifest = {
    events: {},
    portraits: []
  }

  // 1. Process Portraits
  const portraitsDir = path.join(dataDir, 'portraits')
  if (fs.existsSync(portraitsDir)) {
    const files = fs.readdirSync(portraitsDir)
    manifest.portraits = files
      .filter(file => IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase()) || file.endsWith('.MP.jpg'))
      .sort((a, b) => {
        // Sort numerically if possible
        const aNum = parseInt(path.parse(a).name)
        const bNum = parseInt(path.parse(b).name)
        if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum
        return a.localeCompare(b)
      })
  }

  // 2. Process Events
  const eventsDir = path.join(dataDir, 'events')
  if (fs.existsSync(eventsDir)) {
    const eventFolders = fs.readdirSync(eventsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)

    for (const folder of eventFolders) {
      const folderPath = path.join(eventsDir, folder)
      const files = fs.readdirSync(folderPath)
      manifest.events[folder] = files
        .filter(file => IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase()) || file.endsWith('.MP.jpg'))
        .sort((a, b) => {
          const aNum = parseInt(path.parse(a).name)
          const bNum = parseInt(path.parse(b).name)
          if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum
          return a.localeCompare(b)
        })
    }
  }

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const outputPath = path.join(outputDir, 'images-manifest.json')
  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2))
  console.log(`✓ Generated image manifest: ${outputPath}`)
}

generateManifest()
