export { default } from 'next-auth/middleware'
//  the middleware function to redirect user to the login is already implemented in next auth, so we don't have to implement it.
// all we have to do is import and export if from this module.


// a configuration object to specify on which routes this middleware function should be applied

export const config = {
    matcher: [
        '/issues/new',
        '/issues/edit/:id+'
    ]
}