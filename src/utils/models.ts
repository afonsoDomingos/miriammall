import mongoose, { Schema } from 'mongoose';

// 1. Space Schema
const SpaceSchema = new Schema({
  _id: { type: String, required: true },
  number: { type: String, required: true },
  floor: { type: Number, required: true },
  area: { type: Number, required: true },
  status: { type: String, enum: ['disponivel', 'reservado', 'ocupado'], required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  amenities: { type: [String], default: [] },
  image: { type: String, required: true },
  blueprint: { type: String, required: true },
}, { timestamps: true });

// 2. Banner Schema
const BannerSchema = new Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  image: { type: String, required: true },
  buttonText1: { type: String, required: true },
  buttonLink1: { type: String, required: true },
  buttonText2: { type: String, required: true },
  buttonLink2: { type: String, required: true },
  isActive: { type: Boolean, default: false },
}, { timestamps: true });

// 3. Store Schema
const StoreSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  logo: { type: String, required: true },
  category: { type: String, required: true },
  floor: { type: Number, required: true },
  schedule: { type: String, required: true },
  description: { type: String, required: true },
  contact: { type: String, required: true },
}, { timestamps: true });

// 4. Restaurant Schema
const MenuItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String },
});

const RestaurantSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  schedule: { type: String, required: true },
  image: { type: String, required: true },
  menuLink: { type: String, default: '#' },
  menuItems: { type: [MenuItemSchema], default: [] },
}, { timestamps: true });

// 5. MallEvent Schema
const MallEventSchema = new Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

// 6. Promotion Schema
const PromotionSchema = new Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  validity: { type: String, required: true },
  description: { type: String, required: true },
  storeName: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

// 7. RentalRequest Schema
const RentalRequestSchema = new Schema({
  _id: { type: String, required: true },
  date: { type: String, required: true },
  companyName: { type: String, required: true },
  contactName: { type: String, required: true },
  phone: { type: String, required: true },
  whatsapp: { type: String },
  email: { type: String, required: true },
  businessType: { type: String, required: true },
  requestedArea: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['novo', 'respondido', 'arquivado'], default: 'novo' },
}, { timestamps: true });

// Define helper to serialize Mongoose models to matching frontend structures
export function serializeDoc(doc: any) {
  if (!doc) return doc;
  const obj = doc.toObject ? doc.toObject() : doc;
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  if (obj.createdAt) obj.createdAt = obj.createdAt.toISOString();
  if (obj.updatedAt) obj.updatedAt = obj.updatedAt.toISOString();
  return obj;
}

// 8. AdminUser Schema
const AdminUserSchema = new Schema({
  _id: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Compile or reuse Mongoose models
export const Space = mongoose.models.Space || mongoose.model('Space', SpaceSchema);
export const Banner = mongoose.models.Banner || mongoose.model('Banner', BannerSchema);
export const Store = mongoose.models.Store || mongoose.model('Store', StoreSchema);
export const Restaurant = mongoose.models.Restaurant || mongoose.model('Restaurant', RestaurantSchema);
export const MallEvent = mongoose.models.MallEvent || mongoose.model('MallEvent', MallEventSchema);
export const Promotion = mongoose.models.Promotion || mongoose.model('Promotion', PromotionSchema);
export const RentalRequest = mongoose.models.RentalRequest || mongoose.model('RentalRequest', RentalRequestSchema);
export const AdminUser = mongoose.models.AdminUser || mongoose.model('AdminUser', AdminUserSchema);
