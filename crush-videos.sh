#!/bin/bash
export FFMPEG=./node_modules/ffmpeg-static/ffmpeg

for file in ./public/works/optimized/*.mp4; do
  size=$(stat -f%z "$file")
  # 45MB threshold
  if [ $size -ge 45000000 ]; then
    echo "CRUSHING MASSIVE ASSET: $file ($size bytes)"
    $FFMPEG -y -i "$file" -vcodec libx264 -crf 32 -preset fast -vf "scale=-2:720" "${file}_tmp.mp4" </dev/null
    mv "${file}_tmp.mp4" "$file"
  fi
done

echo "Transcoding Sweep Complete. Re-checking sizes..."
find ./public/works/optimized -type f -size +45M -exec ls -lh {} +
