npm run clean &&\
npm run build &&\
aws s3 sync ./build s3://lms.cokecoder.net --storage-class REDUCED_REDUNDANCY --delete