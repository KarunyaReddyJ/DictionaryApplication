const meanings=document.querySelectorAll('#meaning');
document.querySelector('button').addEventListener('click',()=>{
    document.querySelectorAll('#meaning p').forEach((p)=>{
        p.style.display='none'
    })
    let word=document.querySelector('input').value
    const url=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}` 
    fetch(url)
    .then(data=> data.json())
    .then(datas=> {
        const selectAudio=(data)=>{
            let selectedAudio=""
            data.phonetics.forEach((phonetic)=>{
                if(phonetic.audio!==""){
                    selectedAudio=phonetic.audio
                }
            })
            return selectedAudio
        }
        document.querySelector('#meaning').style.opacity='1'
        console.log(datas)
        datas.forEach(data => {
            let p=document.createElement('p')
            if(selectAudio(data)!=="")
                p.innerHTML=`<b>Definition:</b>  ${data.meanings[0].definitions[0].definition}<br> <audio controls src=${selectAudio(data)}></audio>`
            else
                p.innerHTML=`<b>Definition:</b>  ${data.meanings[0].definitions[0].definition}<br> <p>No Audio Available</p>`
            document.querySelector('#meaning').appendChild(p)
        });
        
    
    })
    
})
