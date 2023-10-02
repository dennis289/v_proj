import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './component/auth';
import { db, auth,storage } from './config/firebase';
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
import { ref,uploadBytes } from 'firebase/storage'

function App() {
  const [productList, setProductList] = useState([]);

  // new products
  const [newProductItem, setNewProductItem] = useState('');
  const [newBrand, setNewBrand] = useState('');
  const [newPrice, setNewPrice] = useState(0);
  const [newWeight, setNewWeight] = useState('');

  // update product
  const [updatedProduct, setUpdatedProduct] = useState('');
// file upload state
const [fileUpload, setfileUpload]= useState(null)
  const productCollectionRef = collection(db, 'products');

  const getProductList = async () => {
    try {
      const data = await getDocs(productCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        price: doc.data().price
      }));
      setProductList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  const onSubmitProduct = async () => {
    try {
      await addDoc(productCollectionRef, {
        Item: newProductItem,
        Brand: newBrand,
        price: newPrice,
        Weight: newWeight,
        userId: auth?.currentUser?.uid,
      });
      setNewProductItem('');
      setNewBrand('');
      setNewPrice(0);
      setNewWeight('');
      getProductList();
    } catch (err) {
      console.error(err);
    }
  };


  const deleteProduct = async (id) => {
    const productDoc = doc(db, 'products', id);
    await deleteDoc(productDoc);
    getProductList();
  };

  const updateProduct = async (id) => {
    const productDoc = doc(db, 'products', id);
    await updateDoc(productDoc, { Item: updatedProduct });
    setUpdatedProduct('');
    getProductList();
  };
   const uploadFile = async () =>{
    if(!fileUpload) return;
    const v_fireRef= ref (storage, `v_fire/${fileUpload.name}`)
    try{
    await uploadBytes(v_fireRef, fileUpload)
    }catch(err){
  console.error(err);
    }
   };

  return (
   
    <div className='App'>
      <Auth />
      
      <div>
        <input
          placeholder='product name..'
          value={newProductItem}
          onChange={(e) => setNewProductItem(e.target.value)}
        />
        <input
          placeholder='Brand..'
          value={newBrand}
          onChange={(e) => setNewBrand(e.target.value)}
        />
        <input
          placeholder='Price..'
          type='number'
          value={newPrice}
          onChange={(e) => setNewPrice(Number(e.target.value))}
        />
        <input
          placeholder='Weight..'
          value={newWeight}
          onChange={(e) => setNewWeight(e.target.value)}
        />
        <button onClick={onSubmitProduct}>Add Product</button>
      </div>
      
      <div>
        {productList.map((product) => (
          <div key={product.id}>
            <h3>{product.Item}</h3>
            <p>Brand: {product.Brand}</p>
            <p>Price: ${product.price}</p>
            <p>Weight: {product.Weight}</p>
            <input
              placeholder='New product name..'
              value={updatedProduct}
              onChange={(e) => setUpdatedProduct(e.target.value)}
            />
            <button onClick={() => updateProduct(product.id)}>Update</button>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </div>
        ))}
      </div>
      <div>
        <input type='file' onChange={(e) => setfileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}> Upload file </button>
      </div>
    </div>
   
  );
}

export default App;