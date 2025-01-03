import HomeLayout from "../component/HomeLayout"

function NotFound() {
    return (
        <HomeLayout>
            <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
                <h1 className="text-white font-bold text-2xl ">Page is under construction</h1>
                <h5 className="  text-orange-600">Please come back later</h5>
            </div>
        </HomeLayout>
    )
}

export default NotFound