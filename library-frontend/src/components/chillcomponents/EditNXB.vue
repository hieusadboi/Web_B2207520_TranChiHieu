<template>

    <form class="row g-3">
        <div class="col-md-6">
            <label class="form-label" for="name">Tên nhà xuất bản</label>
            <input type="text" id="name" class="form-control" placeholder="..." v-model="nxb.tenNXB">
        </div>
        <div class="col-md-3">
            <label class="form-label" for="tacgia">Địa chỉ</label>
            <input type="text" class="form-control" id="tacgia" placeholder="..." v-model="nxb.diachiNXB">
        </div>      
        <div class="col-12">
        </div>
    </form>
        
</template>

<script>
import nxbService from '@/services/nxb.service';

    export default {

        props: {
            nxb: {type: Object, required: true}
        },

        methods: {
            async updatetNXB  (){
                if (confirm("Hoàn tất!")) {
                    try {
                        await nxbService.update(this.nxb._id, this.nxb);
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        },
    }

</script>