﻿// <auto-generated />
using System;
using Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Entity.Migrations
{
    [DbContext(typeof(DBContext))]
    [Migration("20230705125613_05072023_1556")]
    partial class _05072023_1556
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.7")
                .HasAnnotation("Proxies:ChangeTracking", false)
                .HasAnnotation("Proxies:CheckEquality", false)
                .HasAnnotation("Proxies:LazyLoading", true)
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Entity.Module", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("CreationUserID")
                        .HasColumnType("int");

                    b.Property<DateTime?>("DeleteDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("DeleteUserID")
                        .HasColumnType("int");

                    b.Property<string>("File")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("ModifyingDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifyingUserID")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Url")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Module");
                });

            modelBuilder.Entity("Entity.ModuleProperties", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("ActionName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ControllerName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("CreationUserID")
                        .HasColumnType("int");

                    b.Property<DateTime?>("DeleteDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("DeleteUserID")
                        .HasColumnType("int");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("MethodType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("ModifyingDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifyingUserID")
                        .HasColumnType("int");

                    b.Property<int>("ModuleID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("ModuleID");

                    b.ToTable("ModuleProperties");
                });

            modelBuilder.Entity("Entity.Role", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("CreationUserID")
                        .HasColumnType("int");

                    b.Property<DateTime?>("DeleteDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("DeleteUserID")
                        .HasColumnType("int");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("ModifyingDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifyingUserID")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Role");

                    b.HasData(
                        new
                        {
                            ID = 1,
                            CreationDate = new DateTime(2023, 7, 5, 15, 56, 13, 690, DateTimeKind.Local).AddTicks(3792),
                            CreationUserID = 1,
                            IsDeleted = false,
                            Name = "Admin"
                        },
                        new
                        {
                            ID = 2,
                            CreationDate = new DateTime(2023, 7, 5, 15, 56, 13, 690, DateTimeKind.Local).AddTicks(3802),
                            CreationUserID = 1,
                            IsDeleted = false,
                            Name = "Creator"
                        },
                        new
                        {
                            ID = 3,
                            CreationDate = new DateTime(2023, 7, 5, 15, 56, 13, 690, DateTimeKind.Local).AddTicks(3803),
                            CreationUserID = 1,
                            IsDeleted = false,
                            Name = "Editor"
                        },
                        new
                        {
                            ID = 4,
                            CreationDate = new DateTime(2023, 7, 5, 15, 56, 13, 690, DateTimeKind.Local).AddTicks(3805),
                            CreationUserID = 1,
                            IsDeleted = false,
                            Name = "Viewer"
                        });
                });

            modelBuilder.Entity("Entity.User", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("CreationUserID")
                        .HasColumnType("int");

                    b.Property<DateTime?>("DeleteDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("DeleteUserID")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("nvarchar(150)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("ModifyingDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifyingUserID")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("ID");

                    b.ToTable("User");

                    b.HasData(
                        new
                        {
                            ID = 1,
                            CreationDate = new DateTime(2023, 7, 5, 12, 56, 13, 690, DateTimeKind.Utc).AddTicks(3674),
                            CreationUserID = 1,
                            Email = "info@adaaapps.com",
                            IsActive = true,
                            IsDeleted = false,
                            Name = "Admin"
                        });
                });

            modelBuilder.Entity("Entity.UserRole", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("CreationUserID")
                        .HasColumnType("int");

                    b.Property<DateTime?>("DeleteDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("DeleteUserID")
                        .HasColumnType("int");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("ModifyingDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifyingUserID")
                        .HasColumnType("int");

                    b.Property<int>("ModuleID")
                        .HasColumnType("int");

                    b.Property<int>("RoleID")
                        .HasColumnType("int");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("ModuleID");

                    b.HasIndex("RoleID");

                    b.HasIndex("UserID");

                    b.ToTable("UserRole");
                });

            modelBuilder.Entity("Entity.ModuleProperties", b =>
                {
                    b.HasOne("Entity.Module", "Module")
                        .WithMany("ModuleProperties")
                        .HasForeignKey("ModuleID")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired()
                        .HasConstraintName("FK_Module_Module_Properties");

                    b.Navigation("Module");
                });

            modelBuilder.Entity("Entity.UserRole", b =>
                {
                    b.HasOne("Entity.Module", "Module")
                        .WithMany("UserRoles")
                        .HasForeignKey("ModuleID")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired()
                        .HasConstraintName("FK_Module_UserRole");

                    b.HasOne("Entity.Role", "Role")
                        .WithMany("UserRoles")
                        .HasForeignKey("RoleID")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired()
                        .HasConstraintName("FK_Role_UserRole");

                    b.HasOne("Entity.User", "User")
                        .WithMany("UserRoles")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired()
                        .HasConstraintName("FK_User_UserRole");

                    b.Navigation("Module");

                    b.Navigation("Role");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Entity.Module", b =>
                {
                    b.Navigation("ModuleProperties");

                    b.Navigation("UserRoles");
                });

            modelBuilder.Entity("Entity.Role", b =>
                {
                    b.Navigation("UserRoles");
                });

            modelBuilder.Entity("Entity.User", b =>
                {
                    b.Navigation("UserRoles");
                });
#pragma warning restore 612, 618
        }
    }
}
