import HomeLayout from "../component/HomeLayout";

function SubGrid(){
    return (
        <HomeLayout>
            <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
                <h1 className="text-white font-bold text-2xl ">This page is for Sub-grids with which will be open with id</h1>
            </div>
        </HomeLayout>
    )
}

export default SubGrid;