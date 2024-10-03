import Images from "@/assets";

const HomeFeatured = () => {
  return (
    <div className="relative">
      <section className="bg-gradient-to-r from-gray-200 to-gray-900 text-white py-28 px-4 lg:px-36">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center lg:pr-8">
            <h1 className="text-xl font-bold leading-tight mb-6 lg:text-5xl text-zinc-700 xl:text-6xl font-serif font-playfair">
              Step into Comfort
            </h1>
            <p className="mb-8 text-zinc-700 text-lg lg:text-xl font-light font-poppins">
              Step up your style game with our exclusive range of shoes. From
              trendy sneakers to elegant formal shoes, find the perfect pair
              that matches your personality and occasion.
            </p>
            <div className="flex gap-4">
              <a
                href="#product_list"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium  bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 transition-transform transform hover:scale-105"
              >
                Shop Now
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-end">
            <img
              src={Images.carBg}
              alt="Shoe Collection"
              className="w-[50rem] h-auto absolute right-0 bottom-0"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeFeatured;
