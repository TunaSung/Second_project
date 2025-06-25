import { useState } from "react"


function Personal() {

    const [activeIndex, setActiveIndex] = useState(1)
    return (
        <div className="container-mid pt-30 flex">

            {/* Start aside */}
            <div>

                {/* Start avatar & name */}
                <div className="flex justify-center items-center gap-2">
                    <div className="border rounded-full w-10 aspect-square"></div>
                    <p className="font-bold" >tuna0</p>
                </div>
                {/* End avatar & name */}

                {/* Start dropdown */}
                <div>
                    
                </div>
                {/* End dropdown */}

            </div>
            {/* End aside */}

            {/* Start main */}
            <div>


            </div>
            {/* End main */}



        </div>
    )
}

export default Personal