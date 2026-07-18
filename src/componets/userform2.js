import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

import { deleteProvider, getUserAndUpdate, getUserById, rejectUser } from "../service/userService";

function Form() {

    const categories = [
        "AC Tech",
        "Painting",
        "Electrical",
        "Carpentry",
        "Plumbing",
        "Cleaning",
    ];
    const [showRejectNote, setShowRejectNote] = useState(false);
const [rejectReason, setRejectReason] = useState("");

    const [selectCategory, setSelectCategory] = useState([]);
    const [profile, setProfile] = useState({
        fullName: "",
        businessName: "",
        phone: "",
        city: "Rawalpindi",
        lat: 30.3753,
        lng: 69.3451,
        bio: "",
        img: "",
        instagram: "",
        facebook: "",
        linkedin: "",
    });

    const [service, setService] = useState({
        title: "",
        category: " ",
        description: "",
        startingPrice: "",
        shopImage: ""
    });
    const [Images, setImages] = useState([]);

    const handleCheckbox = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectCategory([...selectCategory, value]);
        } else {
            setSelectCategory(selectCategory.filter((item) => item !== value));
        }
    };

    function MapClickHandler() {
        useMapEvents({
            click(e) {
                console.log(e);          // Pura event object
                console.log(e.latlng);   // Latitude & Longitude
                console.log(e.latlng.lat);
                console.log(e.latlng.lng);
                setProfile({ ...profile, lat: e.latlng.lat, lng: e.latlng.lng });
            },
        });
        return null;
    }

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });

    };

    const handleServices = (e) => {
        setService({ ...service, [e.target.name]: e.target.value })

    }

    const handleImages = (e) => {

        const { name, files } = e.target;

        if (name === "img") {
            setProfile({
                ...profile,
                img: files[0]
            });
        }

        if (name === "shopImage") {
            setService({
                ...service,
                shopImage: [...files]
            });
        }

    };
    const handleProfileSave = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
console.log(profile)
        const profileData = new FormData();

        profileData.append("fullName", profile.fullName);
        profileData.append("businessName", profile.businessName);
        profileData.append("phone", profile.phone);
        profileData.append("city", profile.city);
        profileData.append("lat", profile.lat);
        profileData.append("lng", profile.lng);
        profileData.append("bio", profile.bio);
        profileData.append("instagram", profile.instagram);
        profileData.append("facebook", profile.facebook);
        profileData.append("linkedin", profile.linkedin);
        profileData.append("img", profile.img);
        console.log("User ID:", user._id);
        console.log("Calling update API...");
        await getUserAndUpdate(user._id, profileData);
      
        console.log("Calling complete ...");
        alert("Your profile has been saved");
    };
    const [addedCategories, setAddedCategories] = useState([]);
   
        const handleCompleteSave = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            console.log(service)
            const formData = new FormData();


            formData.append("title", service.title);
            formData.append("description", service.description);
            formData.append("startingPrice", service.startingPrice);


            for (const cat of selectCategory) {
                formData.append("category", cat);
            }


            for (const image of service.shopImage) {
                formData.append("shopImage", image);
            }



            await getUserAndUpdate(user._id, formData);
            alert("Data saved successfully");
            const data = await getUserById(user._id);
            setAddedCategories(data.category || []);
            setSelectCategory(user.category || []);
        };

    useEffect(() => {
        const getUser = async () => {
            const user = JSON.parse(localStorage.getItem("user"))
            console.log("LocalStorage User:", user);
            if (!user)
                
                return;
            const data = await getUserById(user._id)
           console.log(data)
           

if (data.status === "Rejected") {
    setShowRejectNote(true);
    setRejectReason(data.reason);
}
           

if (!data) {
    console.log("User not found");
    return;
}
            
            setProfile({
                fullName: data.fullName,
                businessName: data.businessName,
                phone: data.phone,
                city: data.city,
                lat: data.lat,
                lng: data.lng,
                bio: data.bio,
                img: data.img,
                facebook: data.facebook,
                linkedin: data.linkedin,
                instagram: data.instagram

            })
            setService({title:data.title,
                description:data.description,
                startingPrice:data.startingPrice
             })
          setAddedCategories(data.category || []);
        }
        getUser();
    }, [])

   const deleteCategory = async (category) => {
    try {
        const data = JSON.parse(localStorage.getItem("user"));
        if (!data) return alert("User session expired!");

     
        await deleteProvider(data._id, category);
        
        // 2. State ko instantly update karein bina refresh kiye
        setAddedCategories((prevCategories) => 
            prevCategories.filter((cat) => cat !== category)
        );
        
        setSelectCategory((prevSelected) => 
            prevSelected.filter((cat) => cat !== category)
        );

        const updatedUser = await deleteProvider(data._id, category);

setAddedCategories(updatedUser.category || []);
setSelectCategory(updatedUser.category || []);

    } catch (error) {
        console.error("Delete category error:", error);
        alert("Could not delete the category. Please try again.");
    }
};



    return (
        
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
            {showRejectNote && (
  <div className="fixed top-5 right-5 w-80 bg-white border-l-4 border-red-500 shadow-2xl rounded-xl p-5 z-50 transition-all duration-500">
    <h2 className="text-lg font-bold text-red-600">
      ❌ Request Rejected
    </h2>

    <p className="mt-3 text-gray-700">
      <span className="font-semibold">Reason:</span>
      <br />
      {rejectReason}
    </p>

    <button
      onClick={() => setShowRejectNote(false)}
      className="mt-5 w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg"
    >
      OK
    </button>
  </div>
)}

            <div className="max-w-7xl mx-auto mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Your Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage your services and business profile.</p>


                <div className="mt-4 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-md">
                    <h2 className="text-sm font-semibold text-amber-800">
                        Your profile is pending admin approval.
                    </h2>
                    <p className="text-xs text-amber-700 mt-1">
                        It won't appear publicly until an admin reviews and approves it. You can keep editing it in the meantime.
                    </p>
                </div>
            </div>


            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">


                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200 h-full">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Profile Details</h1>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fullname</label>
                                <input type="text" name="fullName" value={profile.fullName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                                <input type="text" name="businessName" value={profile.businessName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" placeholder="Apex Services" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input type="text" name="phone" value={profile.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" placeholder="+92 300 1234567" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <select name="city" value={profile.city} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition">
                                    <option>Rawalpindi</option>
                                    <option>Karachi</option>
                                    <option>Lahore</option>
                                    <option>Islamabad</option>
                                    <option>Quetta</option>
                                </select>
                            </div>
                        </div>


                        <div>
                            <h2 className="text-sm font-medium text-gray-700 mb-2">Pin your location on the map</h2>
                            <div className="h-64 w-full rounded-lg overflow-hidden border border-gray-300 z-0">
                               <MapContainer
    center={[
        Number(profile.lat) || 30.3753,
        Number(profile.lng) || 69.3451
    ]}
    zoom={5}
    className="h-full w-full"
>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

    {profile.lat && profile.lng && (
        <Marker
            position={[
                Number(profile.lat),
                Number(profile.lng)
            ]}
        />
    )}

    <MapClickHandler />
</MapContainer>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                            <textarea name="bio" value={profile.bio} onChange={handleChange} rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" placeholder="Tell us about your expertise..."></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                            <input type="file" accept="image/*" name="img" onChange={handleImages} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer" />
                        </div>


                        <div className="pt-4 border-t border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Website & Social Links</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Instagram</label>
                                    <input type="text" name="instagram" value={profile.instagram} onChange={handleChange} placeholder="https://instagram.com/.." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Facebook</label>
                                    <input type="text" name="facebook" value={profile.facebook} onChange={handleChange} placeholder="https://facebook.com/.." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">LinkedIn</label>
                                    <input type="text" name="linkedin" value={profile.linkedin} onChange={handleChange} placeholder="https://linkedin.com/.." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition text-sm" />
                                </div>
                            </div>
                        </div>



                        <button type="button" className="w-full sm:w-auto px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg shadow-sm transition duration-150 ease-in-out"
                            onClick={handleProfileSave}>
                            Save Profile
                        </button>
                    </div>
                </div>

                {/* Add Service Card */}

                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200 h-full">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Add Services</h1>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input type="text" name="title" onChange={handleServices} value={service.title} placeholder="e.g. AC Installation & repair" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                {categories.map((c) => (
                                    <label key={c} className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            value={c}
                                            checked={selectCategory.includes(c)}
                                            onChange={handleCheckbox}
                                            className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                        />
                                        <span>{c}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea name="description" value={service.description} onChange={handleServices} rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" placeholder="Describe what is included in this service..."></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Starting Price (PKR)</label>
                            <input type="text" name="startingPrice" value={service.startingPrice} onChange={handleServices} placeholder="e.g. 1500" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" />
                        </div>
                        {/* Shop Images */}
                        <div className="pt-4 border-t border-gray-100">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Shop Images (0/5)</h3>
                            <input type="file" multiple name="shopImage" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"
                                onChange={handleImages} />
                        </div>
                        <button type="button"
                            onClick={handleCompleteSave} className="w-full sm:w-auto px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg shadow-sm transition duration-150 ease-in-out">
                            Add Service
                        </button>
                    </div>
                    <div className="mt-6">
  {addedCategories.map((cat, index) => (
    <div
      key={index}
      className="flex justify-between items-center bg-white border rounded-lg shadow p-4 mb-3"
    >
      <h3 className="font-semibold">{cat}</h3>

      <button onClick={()=>deleteCategory(cat)} className="bg-red-500 text-white px-3 py-1 rounded">
        Delete
      </button>
    </div>
  ))}
</div>

                </div>

            </div>
        </div>
    );
}

export default Form;