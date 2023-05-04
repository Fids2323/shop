import React, {useEffect, useState} from "react";
import Helmet from "../components/Layout/Helmet";
import {Link} from "react-router-dom";
import heroImg from "../assets/images/hero.png";
import saleImg from "../assets/images/sale.png";
import Button from "../components/common/Button";
import Services from "../components/ui/Services";
import TitleSection from "../components/common/TitleSection";
import ProductList from "../components/ui/ProductList";
import Clock from "../components/ui/Clock";
import productService from "../service/product.service";

const Home = () => {
	const [products, setProducts] = useState([]);
	const [mobileProducts, setMobileProducts] = useState([]);
	const [clockProducts, setClockProducts] = useState([]);
	const [cardProducts, setCardsProducts] = useState([]);
	const [laptopProducts, setLaptopProducts] = useState([]);

	useEffect(() => {
		async function fetchProduct() {
			try {
				const data = await productService.getAllProducts();
				setProducts(data);

				const mobileList = data.filter((item) => item.category === "mobile");
				const filteredMobileProducts = mobileList.sort((a, b) => b.avgRating - a.avgRating).slice(0, 4);

				const clockList = data.filter((item) => item.category === "clock");
				const filteredClockProducts = clockList.sort((a, b) => b.avgRating - a.avgRating).slice(0, 4);

				const cardList = data.filter((item) => item.category === "video card");
				const filteredCardsProducts = cardList.sort((a, b) => b.avgRating - a.avgRating).slice(0, 4);

				const laptopList = data.filter((item) => item.category === "laptop");
				const filteredLaptopProducts = laptopList.sort((a, b) => b.avgRating - a.avgRating).slice(0, 4);

				setMobileProducts(filteredMobileProducts);
				setClockProducts(filteredClockProducts);
				setCardsProducts(filteredCardsProducts);
				setLaptopProducts(filteredLaptopProducts);
			} catch (error) {
				console.log(error);
			}
		}
		fetchProduct();
	}, []);

	const currentYear = new Date().getFullYear();
	return (
		<>
			<Helmet title={"Home"}></Helmet>

			{/* Hero */}
			<section className="bg-hero px-1 py-2 sm:py-8 md:py-12">
				<div className="container  mx-auto flex items-center justify-between flex  sm:pt-0">
					<div className="w-full lg:w-6/12 md:w-6/12">
						<div>
							<p className="text-gray-500 text-md md:text-lg">Popular product in {currentYear}</p>
							<h2 className="text-main text-2xl md:text-4xl font-bold my-4">Keep up with the times and achieve success</h2>
							<p className="text-main leading-7 mb-14">
								"Discover the latest tech trends with our popular products.Stay ahead of the game and achieve success with our premium selection of smartphones, watches, video cards
								and more
							</p>
							<Button backgroundColor="bg-main">
								<Link to="/shop">Buy now</Link>
							</Button>
						</div>
					</div>

					<div className="hidden md:block lg:w-6/12 md:w-6/12">
						<img src={heroImg} alt="mainImg" />
					</div>
				</div>
			</section>

			{/* Services */}
			<Services />

			{/* Popular products */}
			<section>
				<div className="container pt-5 mx-auto flex items-center justify-between">
					<div className="lg:w-full text-center">
						<TitleSection title={"Popular Mobile"} />
						{products.length && <ProductList data={mobileProducts} />}
					</div>
				</div>
			</section>

			{/* Trending clock */}
			<section>
				<div className="container pt-5 mx-auto flex items-center justify-between">
					<div className="lg:w-full text-center">
						<TitleSection title={"Trending clock"} />
						{products.length && <ProductList data={clockProducts} />}
					</div>
				</div>
			</section>

			{/* Timer sales */}
			<section className="bg-main h-74 pb-4">
				<div className="container pt-5 mx-auto flex items-center justify-between">
					<div className="flex w-full">
						<div className="w-full text-center md:text-start lg:w-6/12 md:12/12">
							<div>
								<h4 className="text-white text-sm md:text-lg mb-2">Limited Offer</h4>
								<h3 className="text-white text-lg md:text-2xl mb-3">Crazy Discounts</h3>
							</div>
							<Clock />
							<Button backgroundColor={"bg-white"}>
								<Link to="/shop">Visit Store</Link>
							</Button>
						</div>

						<div className="hidden  md:block flex items-center justify-center">
							<img src={saleImg} alt="Sale" className="center object-contain" />
						</div>
					</div>
				</div>
			</section>

			{/* Amazing Video Cards */}
			<section>
				<div className="container pt-5 mx-auto flex items-center justify-between">
					<div className="lg:w-full text-center">
						<TitleSection title={"Amazing Video Cards"} />
						{products.length && <ProductList data={cardProducts} />}
					</div>
				</div>
			</section>

			{/* Gaming Laptops */}
			<section>
				<div className="container pt-5 mx-auto flex items-center justify-between">
					<div className="lg:w-full text-center">
						<TitleSection title={"Gaming Laptops"} />
						{products.length && <ProductList data={laptopProducts} />}
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;
