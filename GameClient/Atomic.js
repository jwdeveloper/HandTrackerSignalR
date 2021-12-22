


class Atomic
{
    
    constructor()
    {
       this.value = 0;
       this.pool = [];
    }
  
    
    setValue(value)
    {
       if(this.pool.length == 0)
       {
           this.value = value;
           return;
       }
       this.pool.push(value);
    }


    //triggered on start new CPU cycle
    onCPUcycle()
    {
        for(const v of this.pool)
        {
             this.value = v;
        }
        this.pool.clear();
    }

}