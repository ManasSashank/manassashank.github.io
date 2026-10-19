# Project videos

Put your outdoor rover clips here. The Research page expects these names:

| File | Where it appears |
| --- | --- |
| `rover.mp4` | First clip, beside the outdoor robot project |
| `rover-2.mp4` | Second clip, below the first |

If you only have one clip, name it `rover.mp4` and delete the second `vframe` block
in `research.html` (it is marked with a comment). To add a third, copy that block and
change the file name.

The browser shows the first frame before playback starts. If you would rather show a chosen
still, add `poster="assets/img/projects/rover-poster.jpg"` to the `<video>` tag and put that
image in place.

## Keep the files small

GitHub Pages refuses files over 100 MB and a site this size should stay well under that.
Aim for roughly 1080p, around 10 MB per clip. With ffmpeg installed:

```bash
ffmpeg -i original.mp4 -vf "scale='min(1920,iw)':-2" -c:v libx264 -crf 28 \
       -preset slow -movflags +faststart -c:a aac -b:a 96k rover.mp4
```

`-movflags +faststart` matters, since it lets playback begin before the whole file downloads.
Raise `-crf` to shrink the file further, lower it for better quality. Drop `-c:a aac -b:a 96k`
and add `-an` to remove the audio track if the clip has no useful sound.
