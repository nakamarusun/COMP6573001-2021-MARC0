# ffmpeg -i $1 -vcodec copy -acodec copy yourstream.mp4 </dev/null
fname=$1
echo ${fname%/*}/