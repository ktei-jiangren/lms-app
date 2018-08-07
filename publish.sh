npm run clean &&\
npm run build &&\
aws s3 sync ./build s3://lms.disasterdev.net --storage-class REDUCED_REDUNDANCY
