while getopts t:a:p: flag
do
    case "${flag}" in
        t) filetype=${OPTARG};;
        a) appendTimestamp=${OPTARG};;
        p) path=${OPTARG};;
    esac
done

ARTIFACT_BASE_URL="https://proxy-zci-to-repositoi-zca.enedis.fr/artifactory"

if [ "$appendTimestamp" = "true" ]; then
  FILE_NAME="$filetype-$(date +%Y%m%d%H%M%S).tar.gz"
else
  FILE_NAME="$filetype.tar.gz"
fi

cd build

mkdir artefact
tar  -czvf artefact/$FILE_NAME --exclude=./artefact .

echo "THE LAST VERSION=$VERSION"

echo "path= $ARTIFACT_BASE_URL/$path/$FILE_NAME" 

curl -k -u $DOORS_REP_DEPLOY_LOGIN:$DOORS_REP_DEPLOY_PASSWORD -X PUT $ARTIFACT_BASE_URL/$path/$FILE_NAME -T artefact/$FILE_NAME