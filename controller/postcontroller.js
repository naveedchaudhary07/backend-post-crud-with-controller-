
const postdata= require("../data/postdata")

const getallposts=(req,res)=>{
    try{
       res.status(200).json({
        ok:true,
        message:`posts data fetched successfully`,
        data:postdata,
       })
    }
    catch(err){
      res.status(500).json({
        ok:false,
        message:`something went wrong while fetching posts`,
        err:err.message
      })
    }
};


const getsinglepost=(req, res)=>{
  let id = req.params.id;
  try{
     const post = postdata.find((p)=> p.id===id);
     if(!post){
    return  res.status(404).json({
        ok:false,
        message:`post with id ${id} not found`
      })
     }
     res.status(200).json({
      ok:true,
      message:`post with id ${id} fetched successfully`,
      data:post
     })
  }
  catch(err){
    res.status(500).json({
      ok:false,
      message:`error while fetching post with id ${id}`,
      error:err.message
    })
  }
}

const creatpost=(req,res)=>{
  
  try{
      let newpost= {
      title:req.body.title,
      content:req.body.content? req.body.content: "empty",
      id:Date.now().toString()
     }
    if(!newpost.title){
     return res.status(400).json({
        ok:false,
        message:`title must be required`
      })
    }
    res.status(200).json({
      ok:true,
      message:`Your post with id ${newpost.id} added successfully`
    })
    postdata.push(newpost);
  }
  catch(err){

  }
}



const deletepost= (req,res)=>{
  let id = req.params.id;
  try{
     let dltidx= postdata.findIndex((p)=> p.id === id);
     if(dltidx===-1){
      return res.status(404).json({
        ok:false,
        message:`post with id ${id} not found`
      })
     }
     res.status(200).json({
      ok:true,
      message:`post with id ${id} successfully deleted`
     })
     postdata.splice(dltidx,1)
  }
  catch(err){
    res.status(500).json({
      ok:false,
      message:`Post with id ${id} dosent exist`,
      error:err.message
    })
  }
}


const updatepost=(req,res)=>{
  let id= req.params.id
  const updatedobj= {
    title:req.body.title,
    content:req.body.content,
    id:id
  }
  if(!req.body.title | !req.body.content){
    return res.status(400).json({
      ok:false,
      message:`title and content must be required `
    })
  }

  let findidx= postdata.findIndex((p)=>p.id===id);
  try{
    if(findidx===-1){
    return  res.status(404).json({
        ok:true,
        message:`post with id ${id} not found`
      })
    }
    postdata[findidx]=updatedobj;
    res.status(200).json({
      ok:true,
      message:`post with id ${id} updated succesfully`,
      data  : updatedobj
    })
    
  }
  catch(err){
    res.status(500).json({
      ok:false,
      message:`post with id ${id} error while updating`,
      error:err.message
    })
  }
}

module.exports={getallposts,getsinglepost,creatpost,deletepost,updatepost}