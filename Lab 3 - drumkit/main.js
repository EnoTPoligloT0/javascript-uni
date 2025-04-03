// const sound = document.querySelectorAll('sound')
//Date.now() -

const sounds = {
    a: document.querySelector('#s1'),
    s: document.querySelector('#s2'),
    d: document.querySelector('#s3'),
}

const channels = {
    channel1: [],
};

document.addEventListener('keypress', (event) => {
    const sound = sounds[event.key];
    if (sound) {
        play(sound);
        recordSound(event.key); 
    }
});

function recordSound(key) {
    channels.channel1.push({
        key: key,
        time: Date.now(),
    });
    console.log(channels.channel1);
}

const times = []

times.push({
    key: 'a',
    time: 123
})

function play(sound) {
    sound.currentTime = 0;
    sound.play();
}

addEventListener('keypress', (ev) => {
    const key = ev.key
    // switch(key) {
    //     case 'a':
    //         clap.currentTime = 0
    //         clap.play()
    //         break;
    //     case 's':
    //         kick.currentTime = 0
    //         kick.play()
    //         break;
    //     case 'd':
    //         hihat.currentTime = 0
    //         hihat.play()
    //         break;
    // }
    const sound = sounds[key]
    console.dir(sound.dataset.key)
    sound.currentTime = 0
    sound.play()

})

function playRecordedSounds() {
    channels.channel1.forEach(record => {
        setTimeout(() => {
            play(sounds[record.key]);
        }, record.time - channels.channel1[0].time); 
    });
}

document.getElementById('play-recorded').addEventListener('click', playRecordedSounds);