import {Anime} from "otakuanime/services/load";
import * as cheerio from "cheerio";


const Video = async function (id) {
    const detail = [];
    if(id == null ){
        return {
            code:404,
            status:"failed",
            data:{
                message:"not found"
            }
        };
    }

    const content = (await Anime.get("episode/"+id)).data;
    const $ = cheerio.loadBuffer(Buffer.from(content));
    $(".venser").children().each(function(){
        const item = $(this);
        const cover = item.find(".fotoanime > img").attr("src");
        // let title = item.find(".fotoanime > .infozin > .infozingle > p > span").eq(0).text().split(":")[1];
        const mirrorButton = item.find(".mirrorstream")
        let mirror360p = item.find(".mirrorstream > .m360p")
        let mirror480p = item.find(".mirrorstream > .m480p")
        let mirror720p = item.find(".mirrorstream > .m720p")
        
        // if(synopsis && rating && title && title_jp && rating && producer && status && total_episode && duration && release_date && studio && genre){
        //     title = title.trimStart();
        //     title_jp = title.trimStart();
        //     rating = rating.trimStart();
        //     producer = producer.trimStart();
        //     status = status.trimStart();
        //     total_episode = total_episode.trimStart();
        //     duration = duration.trimStart();
        //     release_date = release_date.trimStart();
        //     genre = genre.trimStart();
        //     synopsis = synopsis.trim();
        // }
        // if(!synopsis.length <1){
        //     detail.push({title:title,title_jp:title_jp,rating:rating,producer:producer,status:status,total_episode:total_episode,duration:duration,release_date:release_date,genre:genre,synopsis:synopsis});
        // }
    });

    function generateLinks(){
        // Your JSON string
        const jsonString = '{"id":163072,"i":1,"q":"360p"}';

        // Encode to Base64
        const encodedText = btoa(jsonString);

        console.log(encodedText); // Outputs the Base64 encoded string
    }
   

    // id=166881&i=2&q=480p&nonce=4e8751645a&action=2a3505c93b0035d3f455df82bf976b84
    

    const episode = [];
    $(".venser").children().find(".mirrorstream > .m360p > li").each(function(){
        const item = $(this);
        let name = item.find("a").text()
        let link = item.find("a").attr("href")
        let dataContent = item.find("a").attr("data-content")
        episode.push({
            name:name,
            href:link,
            data:dataContent
        })
    })
    // $(".venser").children().find(".mirrorstream > .m360p > ul > li").each(function(){
    //     const item = $(this);
    //     const name = item.text();
    //     const link = item.find("a").attr("href");
    //     episode.push({
    //         name:name,
    //         link:link
    //     });
    // });
    $(`[data-content="${episode[0].data}"]`).click(function(){
        console.log("Button Clicked")
    })
    // console.log("target="+target)
    // $('.my-button').click(function() {
    //     alert('Button clicked!');
    // });
    let fullLink = `<a href="${episode[0].href}" data-content="${episode[0].data}">${episode[0].name}</a>`
    detail.push({episode:episode});
    detail.push({test:fullLink})
    console.log(fullLink)
    return {
        code:200,
        status:"success",
        data:detail
    }
    
}
export default Video;