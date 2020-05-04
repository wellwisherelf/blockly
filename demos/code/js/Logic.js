
let C_Logic = {};


//List of helper functions
C_Logic.help = {
    
    /**
     * Checks if an array has an element that occurs 
     * more than once.
     * If uni is undefined, the function checks
     * the given array to see if there are any
     * repeating elements. If uni is defined,
     * 
     * @param {*} arr - The array that we're checking.
     * @param {*} uni - An element that we're specifically
     * looking for.
     */
	is_element_unique: function(arr, uni){
		
		if((!arr && !uni) || !arr){
			throw 'Invalid';
		}
		
		if(arr && !uni){
			for(var i = 0; i < arr.length; ++i){
				for(var j = 0; j < arr.length; ++j){
					if((i != j) && (arr[i] == arr[j])){
						return true;
					}
				}
			}
			
			return false;
		}
		
		else {
			return (arr.includes(uni));
		}
		
	}
}


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

let Global_C_Logic = C_Logic;




/*
C_Logic.vector.create_var('1');
C_Logic.vector.create_var('2');
C_Logic.vector.create_var('3');

C_Logic.vector.replace_var('2', '22');

console.log(C_Logic.vector.vecVar);
*/