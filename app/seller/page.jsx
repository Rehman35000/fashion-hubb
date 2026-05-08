'use client'
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const AddProduct = () => {

  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Earphone');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

  };

  return (
    <div className="flex-1 min-h-screen bg-cinnamon-accent/30">
      <form onSubmit={handleSubmit} className="md:p-12 p-6 space-y-8 max-w-2xl">
        <div className="space-y-4">
          <h2 className="text-2xl font-serif font-bold text-cinnamon-primary">Add New Product</h2>
          <div className="w-12 h-0.5 bg-cinnamon-primary/20"></div>
        </div>

        <div>
          <p className="text-sm font-medium text-cinnamon-primary/80 mb-3 uppercase tracking-widest">Product Images</p>
          <div className="flex flex-wrap items-center gap-4">
            {[...Array(4)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`} className="group relative">
                <input onChange={(e) => {
                  const updatedFiles = [...files];
                  updatedFiles[index] = e.target.files[0];
                  setFiles(updatedFiles);
                }} type="file" id={`image${index}`} hidden />
                <div className="w-24 h-32 border border-dashed border-cinnamon-primary/20 rounded-xl flex items-center justify-center overflow-hidden group-hover:border-cinnamon-primary/50 transition-colors cursor-pointer bg-white">
                  <Image
                    className="object-cover w-full h-full p-2"
                    src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                    alt=""
                    width={100}
                    height={100}
                  />
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-cinnamon-primary/60 font-semibold" htmlFor="product-name">
              Product Name
            </label>
            <input
              id="product-name"
              type="text"
              placeholder="e.g. Wool Blazer"
              className="outline-none py-3 px-4 rounded-xl border border-cinnamon-primary/10 focus:border-cinnamon-primary transition-colors bg-white text-sm"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-cinnamon-primary/60 font-semibold" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="outline-none py-3 px-4 rounded-xl border border-cinnamon-primary/10 focus:border-cinnamon-primary transition-colors bg-white text-sm appearance-none"
              onChange={(e) => setCategory(e.target.value)}
              defaultValue={category}
            >
              <option value="Blazers">Blazers</option>
              <option value="Tops">Tops</option>
              <option value="Bottoms">Bottoms</option>
              <option value="Dresses">Dresses</option>
              <option value="Accessories">Accessories</option>
              <option value="Sale">Sale</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest text-cinnamon-primary/60 font-semibold" htmlFor="product-description">
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            className="outline-none py-3 px-4 rounded-xl border border-cinnamon-primary/10 focus:border-cinnamon-primary transition-colors bg-white text-sm resize-none"
            placeholder="Describe the material, fit, and style..."
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-xs uppercase tracking-widest text-cinnamon-primary/60 font-semibold" htmlFor="product-price">
              Regular Price
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cinnamon-primary/40 text-sm">Rs.</span>
              <input
                id="product-price"
                type="number"
                placeholder="0"
                className="w-full outline-none py-3 pl-12 pr-4 rounded-xl border border-cinnamon-primary/10 focus:border-cinnamon-primary transition-colors bg-white text-sm"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-xs uppercase tracking-widest text-cinnamon-primary/60 font-semibold" htmlFor="offer-price">
              Sale Price
            </label>
             <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cinnamon-primary/40 text-sm">Rs.</span>
              <input
                id="offer-price"
                type="number"
                placeholder="0"
                className="w-full outline-none py-3 pl-12 pr-4 rounded-xl border border-cinnamon-primary/10 focus:border-cinnamon-primary transition-colors bg-white text-sm"
                onChange={(e) => setOfferPrice(e.target.value)}
                value={offerPrice}
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" className="w-full md:w-auto px-12 py-4 bg-cinnamon-primary text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-cinnamon-secondary transition-all shadow-lg shadow-cinnamon-primary/20">
          Upload Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;