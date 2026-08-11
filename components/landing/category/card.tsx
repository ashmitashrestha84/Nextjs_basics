import Image from "next/image"

interface IProps{
    category:{
        _id:string,
        name:string,
        image:{
            path:string,
            public_id:string
        }
        description?:string
    }
}




const CategoryCard = ({category:{name, image,description, _id}}:IProps) => {
  return (
    <div className="flex border border-primary max-w-100 h-fit gap-2 p-1 rounded-md items-center hover:translate-y-1 hover:bg-primary transition-all">
         <div className=" h-12 w-12 rounded-sm overflow-clip shrink-0">
        <Image src={image.path} alt={name + "-"+"image"} className="h-full w-full" height={800} width={800}/>
        
    </div>
    <div>
        <p className="text-md font-semibold text-gray-700">{name}</p>
        <p className="line-clamp-2 text-sm leading-">{description}</p>
    </div>
    </div>
  )
}

export default CategoryCard