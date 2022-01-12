#!/bin/sh
# Converts a flv file from nginx rtmp to mp4 and deletes the original
fname=$1

if [ -z "$fname" ]
then
  echo "Insert a filename!"
  exit 1
fi

# Transcode video to mp4
ffmpeg -i ${fname} -b:v 1500k -vcodec copy -acodec copy ${fname%.*}.mp4 </dev/null

# Delete original video
rm ${fname}

# Return the name of the file
echo ${fname%.*}.mp4