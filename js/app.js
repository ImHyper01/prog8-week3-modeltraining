const video = document.getElementById("webcam");
const label = document.getElementById("label");

const labelOneBtn = document.querySelector("#AirForce");
const labelTwoBtn = document.querySelector("#Jordan");
const labelThreeBtn = document.querySelector("#Converse");
const trainbtn = document.querySelector("#train");

const saveModelBtn = document.querySelector("#saveModel");
const statusBtn = document.querySelector("#status");

const featureExtractor = ml5.featureExtractor('MobileNet', { numLabels: 3 }, modelLoaded);

const labelOne = "Air Force 1"
const labelTwo = "Jordan 1"
const labelThree = "Converse"

labelOneBtn.innerText = "Label " + labelOne
labelTwoBtn.innerText = "Label " + labelTwo
labelThreeBtn.innerText = "Label " + labelThree

function modelLoaded() {
    console.log('Model Loaded!');
    classifier = featureExtractor.classification(video, videoReady);
}

function loadCustomModel() {
    console.log('Custom Model Loaded!');
    featureExtractor.load("./model/model.json");
}

function videoReady() {
    console.log("The webcam is ready!");
}

function enableInterval() {
    setInterval(classifyWebcam, 1000);
    statusBtn.innerText = "Enabled"
}

labelOneBtn.addEventListener("click", () => {
    console.log("Label " + labelOne);

    // Add a new image with a label
    classifier.addImage(video, labelOne);
});

labelTwoBtn.addEventListener("click", () => {
    console.log("Label " + labelTwo);

    // Add a new image with a label
    classifier.addImage(video, labelTwo);
});

labelThreeBtn.addEventListener("click", () => {
    console.log("Label " + labelThree);

    // Add a new image with a label
    classifier.addImage(video, labelThree);
});

trainbtn.addEventListener("click", () => {
    console.log("train")

    classifier.train((lossValue) => {
        console.log('Loss is', lossValue);
        // if (lossValue == null) {
        //     setInterval(classifyWebcam, 1000);
        // }
      });
});

saveModelBtn.addEventListener("click", () => {
    console.log("Save")

    featureExtractor.save();
});

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            console.log("Something went wrong!");
        });
}

// Get a prediction for that image
function classifyWebcam() {
    classifier.classify(video, (err, result) => {
        if (result) {
            console.log(result[0]['label']);
        }
    });
}

label.innerText = "Ready when you are!";

label.innerText = "Ready when you are!";
