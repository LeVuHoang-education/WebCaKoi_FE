import {useEffect, useState} from "react";
import {fetchRatings,deleteRatings} from "../../service/RatingApi.jsx";

const RatingManage = () => {
    const [rating, setRating] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ratingPerPage = 6;

    const renderRating = (rating) => {
        const maxStars = 5;
        return (
            <div className="flex">
                {Array.from({length: maxStars}, (_, index) => (
                    <span key={index} className={index < rating ? "text-yellow-400 text-xl" : "text-gray-300 text-xl"}>
                        ★
                    </span>
                ))}
            </div>
        );
    };
    useEffect(() => {
        const getRating = async () => {
            try {
                const ratingList = await fetchRatings();
                console.log(ratingList.data);
                setRating(ratingList.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        getRating();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const totalPages = Math.ceil(rating.length / ratingPerPage);
    const indexOfLastRating = currentPage * ratingPerPage;
    const indexOfFirstRating = indexOfLastRating - ratingPerPage;
    const currentRating = rating.slice(indexOfFirstRating, indexOfLastRating);
    const handdleChangePages = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handdleDeleteRating = async (ratingId) => {
        try{
            await deleteRatings(ratingId);
            const newRating = rating.filter((item) => item.ratingId !== ratingId);
            setRating(newRating);
        }catch (e){
            console.error(e);
        }
    }
    return (
        <div className={`rating-manage`}>
            <div className={`grid grid-cols-2 gap-4`}>
                {currentRating.map((item) => (
                    <div key={item.ratingId} className={`text-black shadow p-4 w-full h-auto rounded-3xl`}>
                        <div className={`flex flex-col items-center`}>
                            <div className={`flex justify-evenly items-center w-full`}>
                                <div className={`font-bold w-full text-left text-xl`}>ID: {item.ratingId}</div>
                                <img src="/img/icons8-delete-100.png"
                                     className={`w-5 h-5 hover:cursor-pointer`} onClick={()=>{
                                    if (window.confirm("Bạn có chắc muốn xóa đánh giá này?")) {
                                        handdleDeleteRating(item.ratingId);
                                    }
                                }} alt=""/>
                            </div>
                            <div className={`font-bold w-full text-left text-xl `}>Email: {item.userEmail}</div>
                        </div>
                        <div className={`font-bold flex py-2 justify-between`}>
                            <label className={`text-xl`}>
                                Đánh giá
                            </label>
                            <div className={`font-bold`}>{renderRating(item.rating)}</div>
                        </div>
                        <textarea
                            disabled={true}
                            className={`rounded-lg bg-gray-100`}
                            defaultValue={item.feedback}
                        />
                    </div>
                ))}
            </div>
            <div className={"flex justify-center mt-4"}>
                <button disabled={currentPage === 1}
                        onClick={() => handdleChangePages(currentPage - 1)}
                        className={"px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"}
                >
                    &lt;
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handdleChangePages(index + 1)}
                        className={`px-4 py-2 mx-1 rounded-full ${currentPage === index + 1 ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button disabled={currentPage === totalPages}
                        onClick={() => handdleChangePages(currentPage + 1)}
                        className={"px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
}
export default RatingManage;