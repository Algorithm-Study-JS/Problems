function solution(genres, plays) {
    const genreMap = new Map();
    
    for(let i = 0; i < genres.length; i++) {
        const [genre, play] = [genres[i], plays[i]];
        
        if(!genreMap.has(genre)) {
            genreMap.set(genre, { total: 0, songs: [] });
        }
        
        genreMap.get(genre).total += play;
        genreMap.get(genre).songs.push({index: i, play: play});
    }
    
    const sorted = [...genreMap.entries()].sort((a, b) => b[1].total - a[1].total);
    
    const answer = [];
    
    for(const [genre, data] of sorted) {
        data.songs.sort((a, b) => b.play - a.play);
        answer.push(data.songs.slice(0, 2).map(song => song.index));        
    }
    
    return answer.flat();
}
