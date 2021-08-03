import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as d3 from 'd3';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-d3-scatter-plot',
  templateUrl: './d3-scatter-plot.component.html',
  styleUrls: ['./d3-scatter-plot.component.scss'],
})
export class D3ScatterPlotComponent implements OnInit, AfterViewInit {
  users$: Observable<User[]> = this.STORE.pipe(select('users'));
  svg: any = undefined;
  margin = { top: 10, right: 30, bottom: 24, left: 30 };
  width = 320 - this.margin.left - this.margin.right;
  height = 320 - this.margin.top - this.margin.bottom;

  constructor(private STORE: Store<{ users: User[] }>) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    
    this.initSVG();

    //Read the data
    this.users$
      .pipe(filter((users) => users && users.length > 0))
      .subscribe((users) => {
        if(this.svg){
          d3.selectAll("g > *").remove()
        }
        const bounds = this.extractMinMaxValues(users);
        this.renderGraph(users, bounds);
      });
  }

  initSVG(){
    // append the svg object to the body of the page
    this.svg = d3
      .select('#d3ScatterPlot')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      );
  }

  renderGraph(
    users: User[],
    bounds: {
      maxAge: number;
      minAge: number;
      maxWeight: number;
      minWeight: number;
    }
  ): void {
    // Add X axis
    var x = d3
      .scaleLinear()
      .domain([bounds.minAge, bounds.maxAge])
      .range([0, this.width]);
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3
      .scaleLinear()
      .domain([bounds.minWeight, bounds.maxWeight])
      .range([this.height, 0]);
    this.svg.append('g').call(d3.axisLeft(y));

    // Add dots
    this.svg
      .append('g')
      .selectAll('dot')
      .data(users)
      .enter()
      .append('circle')
      .attr('cx', function (d: User) {
        return x(d.age);
      })
      .attr('cy', function (d: User) {
        return y(d.weight);
      })
      .attr('r', 4)
      .style('fill', '#ff4082')
      .style('stroke', '#3f51b588')
  }

  extractMinMaxValues(users: User[]): {
    maxAge: number;
    minAge: number;
    maxWeight: number;
    minWeight: number;
  } {
    let maxAge = 0;
    let minAge = 0;
    let maxWeight = 0;
    let minWeight = 0;
    // let maxAge = users[0].age;
    // let minAge = users[0].age;
    // let maxWeight = users[0].weight;
    // let minWeight = users[0].weight;

    for (let user of users) {
      if (user.age > maxAge) {
        maxAge = user.age;
      }
      if (user.age < minAge) {
        minAge = user.age;
      }

      if (user.weight > maxWeight) {
        maxWeight = user.weight;
      }
      if (user.weight < minWeight) {
        minWeight = user.weight;
      }
    }

    return { maxAge, minAge, maxWeight, minWeight };
  }
}
