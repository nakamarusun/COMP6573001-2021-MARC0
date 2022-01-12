#!/bin/sh
# Converts a flv file from nginx rtmp to mp4 and deletes the original
fname=$1

# Transcode video to mp4
ffmpeg -i ${fname} -b:v 1500k -vcodec copy -acodec copy ${fname%.*}.mp4 </dev/null

# Delete original video
rm ${fname}

# Return the name of the file
echo ${fname%/*}/${fname%.*}.mp4