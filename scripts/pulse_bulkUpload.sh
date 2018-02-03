ORIGFOLDER=dev/fyp/data_file_new/*
DESTFOLDER=dev/fyp/data_file_uploaded/
for f in $ORIGFOLDER
do
	DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
	echo "$DATE  Processing $f"
	curl -X POST http://localhost:3000/input/upload -F data=@$f
	mv $f $DESTFOLDER
	printf '\n'
	sleep 60
done
