const employee = require('./models/employee')
const user = require('./models/user')

exports.resolvers = {
    Query: {
        login: async({_, args}) => {
            console.log(args)
            const user = await user.findOne({
                username: args.username, 
                email: args.email
             })
             if (!user || user.password !== args.password ){
                throw new Error('wrong username/password')
             }
             return user
        },
        getAllEmployees: async(parent, args) => {
            return employee.find({})
        },
        searchEmployeeById: async(parent, args) => {
            return employee.findById(args._id)
        } 
    },
    Mutation: {
        signup: async(parent,args) => {
            console.log(args)

            let newUser = new user({
                username: args.username,
                email: args.email,
                password: args.password
            })
            return newUser.save()
        },
        addNewEmployee: async(parent,args) => {
            console.log(args)

            let newEmployee = new employee({
                first_name: args.first_name,
                last_name: args.last_name,
                email: args.email,
                gender: args.gender,
                salary: args.salary
            })
            return newEmployee.save()
        },
        updateEmployeeById: async(parent,args) => {
            console.log(args)
            if (!args._id){
                return
            }
            return await employee.findOneAndUpdate(
                {
                _id: args._id
                },
                {
                    $set: {
                        first_name: args.first_name,
                        last_name: args.last_name,
                        email: args.email,
                        gender: args.gender,
                        salary: args.salary
                    }
                }
            )
        },
        deleteEmployeeById: async(parent,args) => {
            console.log(args)
            return await employee.findByIdAndDelete(args._id)
        }
    }
}