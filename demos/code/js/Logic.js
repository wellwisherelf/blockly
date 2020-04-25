
let C_Logic = {};

C_Logic.include = {

    iostream: false,
    cmath: false,
    ctime: false,
    string: false,
    cstdlib: false,
    cctype: false,
    vector: false

};

C_Logic.namespace = {

    using_namespace_std: false
    
};

C_Logic.vector = {
    //Control array from
    //vector declaration block
    vecVar: [],


    create_var: function(create){
        if(!create || (typeof create != 'string')){
            throw 'Invalid call to C_Logic.vector.create_var()';
        }

        if(!this.validate_var(create)){
            this.vecVar.push(create);
        }
	},
	
    replace_var: function(oldVar, newVar){
        if(!oldVar || (typeof oldVar != 'string')){
            throw 'Invalid call to C_Logic.vector.replace_var()';
        }
        if(!newVar || (typeof newVar != 'string')){
            throw 'Invalid call to C_Logic.vector.replace_var()';
        }

        if(this.validate_var(oldVar)){
			const index = this.vecVar.indexOf(oldVar)
			this.vecVar[index] = newVar;
        }
    },

	delete_var: function(del){
		if(!del || (typeof del != 'string')){
		    throw 'Invalid call to C_Logic.vector.delete_var()';
		}
		
		const index = this.vecVar.indexOf(del);
		
		if(index > -1){
		    this.vecVar.splice(index, 1);
		}

	},

    //Check if a variable exists via a vector declaration
    validate_var: function(validate){
        if(!validate || (typeof validate != 'string')){
            throw 'Invalid call to C_Logic.vector.validate_var()';
        }

        return (this.vecVar.includes(validate));
    }

};
/*
C_Logic.vector.create_var('1');
C_Logic.vector.create_var('2');
C_Logic.vector.create_var('3');

C_Logic.vector.replace_var('2', '22');

console.log(C_Logic.vector.vecVar);
*/