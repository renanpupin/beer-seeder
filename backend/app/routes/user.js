import express from 'express';
import userCtrl from '../controllers/user';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    /** GET /api/users - Get list of users */
    .get(userCtrl.list)

    /** POST /api/users - Create new user */
    .post(userCtrl.create);

router.route('/:id')
    /** GET /api/users/:id - Get user */
    .get(userCtrl.get)

    /** PUT /api/users/:id - Update user */
    .put(userCtrl.update)

    /** DELETE /api/users/:id - Delete user */
    .delete(userCtrl.remove);

export default router;