/**
 * @swagger
 * definition:
 *   user:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 * @swagger
 * /api/user/all:
 *   get:
 *     tags:
 *       - users
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/user'
 * @swagger
 * /api/user/signup:
 *   post:
 *     tags:
 *       - users
 *     description: Create a new User
 *     parameters:
 *       - in: body
 *         name: email
 *         email: email
 *         description: User Created Successfully
 *         required: 
 *           - name
 *           - email
 *         schema:
 *           $ref: '#/definitions/user'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User Created Successfully
 *         schema:
 *           $ref: '#/definitions/user'
 */