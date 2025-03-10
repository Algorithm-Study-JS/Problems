function total (arr) {
    return arr.reduce((acc, cur) => acc + cur[1], 0);
}

function solution(genres, plays) {
    const album = {};

    for (let i = 0; i < genres.length; i++) {
        album[genres[i]] = album[genres[i]] || [];
        album[genres[i]].push([i, plays[i]]);
    }

    for (let genre in album) {
        album[genre].sort((a, b) => b[1] - a[1] || a[0] - b[0]);
    }

    const order = Object.keys(album).sort((a, b) => total(album[b]) - total(album[a]));
    const answer = [];
    
    order.forEach(genre => {
        const songs = album[genre];
        answer.push(songs[0][0]);
        if (songs.length > 1) {
            answer.push(songs[1][0]);
        }
    })

    return answer;
}
