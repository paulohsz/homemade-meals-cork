import dbConnect from '../../../src/api/utils/dbConnect';
import User from '../../../src/api/models/User';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const users = await User.find({}, { password: 0 }); /* find all the data in our database */
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const user = await User.create(
          req.body,
        ); /* create a new model in the database */
        if (user._doc.password) delete user._doc.password;
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, error, errors: error.errors });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
