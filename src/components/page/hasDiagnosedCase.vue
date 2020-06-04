<template>
  <div>
    <el-card class="box-card">
      <div style="font-size:20px;font-weight:bold;color:#666;letter-spacing:3px">已诊断病例</div>
      <el-row :gutter="20" style="margin:30px 0;padding-left:0">
        <el-col :span="6" style="padding-left:0">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"/>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 添加用户对话框 -->
      <el-dialog
        title="添加用户"
        :visible.sync="addDialogVisible"
        width="40%"
        @close="addDialogClose">
        <!-- 添加用户主体内容 -->
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" class="demo-ruleForm">
          <el-form-item label="病理号" prop="caseId">
            <el-input v-model="addForm.caseId"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="addForm.age"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-input v-model="addForm.sex"></el-input>
          </el-form-item>
          <el-form-item label="病例类型" prop="caseType">
            <el-input v-model="addForm.caseType"></el-input>
          </el-form-item>
          <el-form-item label="送检机构" prop="institution">
            <el-input v-model="addForm.institution"></el-input>
          </el-form-item>
          <el-form-item label="提交时间" prop="submitDateStr">
            <el-input v-model="addForm.submitDateStr"></el-input>
          </el-form-item>
          <el-form-item label="预计报告日期" prop="expectedDateStr">
            <el-input v-model="addForm.expectedDateStr"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改用户对话框 -->
      <el-dialog
        title="编辑用户信息"
        :visible.sync="editDialogVisible"
        width="40%"
        @close="editDialogClose">
        <!-- 修改用户主体内容 -->
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px" class="demo-ruleForm">
          <el-form-item label="病理号" prop="caseId">
            <el-input v-model="addForm.caseId"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="addForm.age"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-input v-model="addForm.sex"></el-input>
          </el-form-item>
          <el-form-item label="病例类型" prop="caseType">
            <el-input v-model="addForm.caseType"></el-input>
          </el-form-item>
          <el-form-item label="送检机构" prop="institution">
            <el-input v-model="addForm.institution"></el-input>
          </el-form-item>
          <el-form-item label="提交时间" prop="submitDateStr">
            <el-input v-model="addForm.submitDateStr"></el-input>
          </el-form-item>
          <el-form-item label="预计报告日期" prop="expectedDateStr">
            <el-input v-model="addForm.expectedDateStr"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 表格区域 -->
      <el-table
        :data="tableData"
        style="width: 100%;text-align:center"
        stripe
        border
      > 
        <el-table-column
        type="index"
        min-width="1"
        />
        <el-table-column
          prop="caseId"
          label="病理号"
          min-width="2"
        />
        <el-table-column
          prop="submitDateStr"
          label="提交时间"
          min-width="3"
        />
        <el-table-column
          prop="expectedDateStr"
          label="预计报告日期"
          min-width="3"
        />
        <el-table-column
          prop="caseType"
          label="病例类型"
          min-width="3"
        />
        <el-table-column
          prop="name"
          label="姓名"
          min-width="2"
        />
        <el-table-column
          prop="sex"
          label="性别"
          min-width="2"
        />
        <el-table-column
          prop="age"
          label="年龄"
          min-width="2"
        />
        <el-table-column
          prop="institution"
          label="送检机构"
          min-width="3"
        />
        <el-table-column
          prop="caseStatus"
          label="状态"
          min-width="2"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.caseStatus === 0" type="danger" plain>{{scope.row.caseStatus === 0 ? '待诊断' : (scope.row.caseStatus === 1 ? '诊断中' : '复核')}}</el-tag>
            <el-tag v-if="scope.row.caseStatus === 1" type="warning" plain>{{scope.row.caseStatus === 0 ? '待诊断' : (scope.row.caseStatus === 1 ? '诊断中' : '复核')}}</el-tag>
            <el-tag v-if="scope.row.caseStatus === 2" type="success" plain>{{scope.row.caseStatus === 0 ? '待诊断' : (scope.row.caseStatus === 1 ? '诊断中' : '复核')}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="edit"
          label="操作"
          min-width="4"
        >
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.caseId)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.caseId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="margin:30px 0;">
        <el-pagination
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import {$axios} from '../../utils/request'
import {Message, MessageBox} from 'element-ui'
export default {
  data() {
    return {
      tableData: [],
      statusTagType: '',
      // 添加用户
      addDialogVisible: false,
      addForm: {
        caseId: '',
        submitDateStr: '',
        expectedDateStr: '',
        caseType: '',
        name: '',
        sex: '',
        age: '',
        institution: '',
        caseStatus: ''
      },
      addFormRules: {
        caseId: [
          { required: true, message: '请输入病理号', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请输入性别', trigger: 'blur' },
        ],
        caseType: [
          { required: true, message: '请输入病例类型', trigger: 'blur' },
        ],
        caseType: [
          { required: true, message: '请输入病例类型', trigger: 'blur' },
        ],
        institution: [
          { required: true, message: '请输入送检机构', trigger: 'blur' },
        ],
      },
      // 修改用户
      editDialogVisible: false,
      editForm: {
        caseId: '',
        submitDateStr: '',
        expectedDateStr: '',
        caseType: '',
        name: '',
        sex: '',
        age: '',
        institution: '',
        caseStatus: ''
      },
      editFormRules: {
        caseId: [
          { required: true, message: '请输入病理号', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请输入性别', trigger: 'blur' },
        ],
        caseType: [
          { required: true, message: '请输入病例类型', trigger: 'blur' },
        ],
        caseType: [
          { required: true, message: '请输入病例类型', trigger: 'blur' },
        ],
        institution: [
          { required: true, message: '请输入送检机构', trigger: 'blur' },
        ],
      },
    }
  },
  mounted () {
    this.getUnSubmitCase()
  },
  methods: {
    getUnSubmitCase () {
      $axios({
        url: 'hasDiagnosedCase'
      }).then(res => {
        this.tableData = res.data.data
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if ((rowIndex + 1) % 2 === 0) {
        return 'warning-row'
      } else if ((rowIndex + 1) % 4 === 0) {
        return 'success-row'
      }
      return ''
    },
    addDialogClose () {
      this.$refs.addFormRef.resetFields()
    },
    editDialogClose () {
      this.$refs.editFormRef.resetFields()
    },
    async showEditDialog (caseId) { // 编辑用户信息
      this.editDialogVisible = true
      for (let i = 0; i < this.tableData.length; i++) { // 模拟查询接口
        if (this.tableData[i].caseId === caseId) {
          // this.$nextTick(() => {
            this.editForm = this.tableData[i]
            console.log(this.editForm)
          // })
        }
      }
    },
    async removeUserById (caseId) { // 删除用户信息
      const res = await MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (res === 'confirm') {
        for (let i = 0; i < this.tableData.length; i++) { // 模拟查询接口
          if (this.tableData[i].caseId === caseId) {
            this.editForm = this.tableData[i]
            this.tableData.splice(i,1)
          }
        }
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      } else {
          this.$message({
          type: 'info',
          message: '已取消删除'
        });
      }
    }
  }
}
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .el-table td, .el-table th {
      text-align: center;
  } 
</style>
