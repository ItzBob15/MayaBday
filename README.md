# Birthday Website

A special birthday website with interactive games and a photo gallery.

## Project Structure

```
public/
  ├── music/         # Place your music files here
  │   └── bgm.mp3    # Background music
  └── photos/        # Place your photos here
      ├── photo1.jpg
      ├── photo2.jpg
      ├── photo3.jpg
      └── photo4.jpg

src/
  ├── components/
  │   ├── Games/
  │   │   ├── SnakeGame.tsx
  │   │   ├── MemoryGame.tsx
  │   │   └── SpecialGallery.tsx
  │   ├── Header.tsx
  │   ├── Footer.tsx
  │   └── ...
  └── styles/
      └── animations.css
```

## Customization

1. Photos: Place your photos in `public/photos/` and update the paths in `SpecialGallery.tsx`
2. Music: Place your background music in `public/music/` and update the audio source in `App.tsx`
3. Messages: Update the messages in `SpecialGallery.tsx` and `LoveMessage.tsx`