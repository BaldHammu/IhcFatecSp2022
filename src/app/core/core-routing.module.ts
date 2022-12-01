import { NgModule } from '@angular/core'
import { RouterModule, Routes} from '@angular/router'
import { BacklogSprintComponent } from '../backlog-sprint/backlog-sprint.component'
import { BacklogComponent } from '../backlog/backlog.component'
import { LoginComponent } from '../login/login/login.component'
import { ParametrosProjetoComponent } from '../parametros-projeto/parametros-projeto.component'
import { RegisterComponent } from '../register/register.component'
import { CoreComponent } from './core.component'

const routes:Routes =[
    {path:'', component:CoreComponent,  children:[
        {path: '', redirectTo: 'login', pathMatch: 'full'},
        {path:'login', component:LoginComponent},
        {path:'registrar-se', component:RegisterComponent},
        {path:'backlog', component:BacklogComponent},
        {path:'backlog-sprint', component:BacklogSprintComponent},
        {path:'parametros', component:ParametrosProjetoComponent}]}
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class CoreRoutingModule{}