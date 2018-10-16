<template>
    <div :class="prfClass">
        <common-header></common-header>
        <section class="breadcrumb-box">
            <breadcrumb :breadcrumb_list="breadcrumbList" :type="typeNumber"></breadcrumb>
        </section>
        <div :class="[prfClass + '-wrap']">
            <div class="main-content-box">
                <div class="main-content">
                    <h2>隐私政策</h2>
                    <div class="part_one">
                        <a href="http://www.lida-logistics.com" target="_blank">www.lida-logistics.com</a>（以下简称“力达物流平台”或“我们”）重视客户/访问者的隐私，
                        并采取一切预防措施来保护我们收集的信息免受未经授权的访问、修改或泄露。以下是力达物流平台隐私政策的详细说明。
                    </div>
                    <ul>
                        <li>
                            <h3>1.信息收集</h3>
                            力达物流平台隐私协议中涉及的信息包括：公司、个人身份信息；网络账号信息（包括邮箱地址、力达物流平台账号密码等）；力达物流平台浏览记录。
                        </li>
                        <li>
                            <h3>2.信息保护</h3>
                            防止未经授权访问我们的信息存储区域。我们遵守严格的招聘流程，筛选掉有犯罪背景的潜在员工。我们雇用的所有员工必须签署保密协议，禁止员工将可访问的您的隐私信息泄露给其他个人或公司。
                            我们也有备份服务器和电源供应，以防止停电和其他可能对您个人信息造成威胁的自然事件。您需要密码才能访问您的帐户。一旦账户被注销，我们将采取措施将那些被注销的用户从系统中删除。
                            当员工终止服务离开公司时，我们将更改该员工用来访问客户帐户的访问代码。
                        </li>
                        <li>
                            <h3>3.信息访问权限</h3>
                            只有负责处理您账户的员工才能访问您的信息。此外，我们技术部门的员工可能会访问您的信息，以便对系统进行例行检查，并执行必要的维护工作。
                            此外，经正式授权的政府机关（例如法院检察院等司法机构）或其他监管机构要求，我们会披露有关您的账户信息。
                            最后，如果我们的公司被收购或出售，您的账户信息将成为新的所有者的财产。
                        </li>
                        <li>
                            <h3>4.用户权限</h3>
                            在您的账户有效存在期间，您始终可以查看您的账户，以确保我们收集的信息是正确的。
                            您也可以选择删除任何您希望保密的信息。但是，请注意，删除某些信息（如您的电子邮件地址，联系信息等）可能会极大地阻碍我们有效地提供服务。
                            我们建议您先与我们联系，讨论您可以删除哪些信息，以防止影响我们提供给您的服务的质量。
                        </li>
                        <li>
                            <h3>5.变更声明</h3>
                            我们保留随时更改隐私政策的权利。如果有任何变化，我们会将信息发布到网站上，并在主页上发布通告。
                            我们也将采取合理的方式与您联系，让您了解新的变化。如果公司被收购或转售给其他人，我们将采取合理的方式通知到您个人。
                            然后，您可以选择保持或终止账户。
                        </li>
                    </ul>
                    <ul class="address">
                        <li>地址：深圳市南山区东滨路永新汇</li>
                        <li>电话： 0755-32902009</li>
                        <li>电子邮件：<a href="mailto:Supply-CS@lida-logistics.com">Supply-CS@lida-logistics.com</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CommonHeader from '../../components/commonHeader'
import breadcrumb from '../../components/breadcrumb'

export default {
    name: 'privacy_policy',
    components: {
        CommonHeader,
        breadcrumb
    },
    data () {
        return {
            prfClass: 'privacy-policy',
            breadcrumbList: [ // 面包屑
                {
                    name: '首页',
                    url: '/'
                },
                {
                    name: '隐私政策',
                    url: ''
                }
            ],
            typeNumber: 1 // 面包屑是第一级否是首页 传值的话是首页 不传默认是个人中心
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'privacy-policy';
    .#{$prfClass}{
        .breadcrumb-box{
            margin: 10px 13px;
        }
        .#{$prfClass}-wrap{
            text-align: center;
            .main-content-box{
                background: #fff;
                margin: 0 25px;
                line-height: 28px;
                font-size: 14px;
                color: #2F3032;
                margin-bottom: 60px;
                text-align: left;
                .main-content{
                    width: 1040px;
                    margin: 0 auto;
                    padding: 0 80px 60px;
                }
                .part_one{
                    margin-bottom: 20px;
                    a{
                        color: #429EFD;
                    }
                }
                h2{
                    color: #429EFD;
                    padding: 60px 0;
                    font-weight: bold;
                    font-size: 28px;
                    text-align: center;
                }
                li{
                    margin-bottom: 20px;
                }
                .address{
                    li{
                        margin-bottom: 0;
                        line-height: 28px;
                        a{
                            color: #429EFD;
                        }
                    }
                }
            }
        }
    }
</style>
